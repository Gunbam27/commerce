import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity, size = '', color = '' } = addToCartDto;

    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Upsert cart item with variant info
    return this.prisma.cartItem.upsert({
      where: {
        userId_productId_size_color: {
          userId,
          productId,
          size,
          color,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId,
        quantity,
        size,
        color,
      },
    });
  }

  async getCart(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
          },
        },
      },
    });
  }

  async updateQuantity(userId: number, productId: number, updateCartItemDto: UpdateCartItemDto) {
    const { quantity, size = '', color = '' } = updateCartItemDto;
    return this.prisma.cartItem.update({
      where: {
        userId_productId_size_color: {
          userId,
          productId,
          size,
          color,
        },
      },
      data: {
        quantity,
      },
    });
  }

  async removeItem(userId: number, productId: number, size: string = '', color: string = '') {
    return this.prisma.cartItem.delete({
      where: {
        userId_productId_size_color: {
          userId,
          productId,
          size,
          color,
        },
      },
    });
  }

  async clearCart(userId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
