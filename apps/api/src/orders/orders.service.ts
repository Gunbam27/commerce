import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    // 1. Get cart items
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 2. Perform transaction
    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData: any[] = [];

      for (const item of cartItems) {
        // Check stock
        if (item.product.stock < item.quantity) {
          throw new BadRequestException(`Not enough stock for product: ${item.product.name}`);
        }

        // Calculate total
        const price = Number(item.product.price);
        totalAmount += price * item.quantity;

        // Prepare order item data
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: price,
        });

        // Decrement stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Create Order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      // 4. Clear Cart
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return order;
    });
  }

  async findAll(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
