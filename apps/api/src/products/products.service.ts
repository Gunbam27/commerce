import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    return this.prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async findAll(query?: {
    categoryId?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    skip?: number;
    take?: number;
  }) {
    const { categoryId, search, minPrice, maxPrice, colors, sizes, skip = 0, take = 10 } = query || {};
    
    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Price Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Colors Filter (hasSome for array)
    if (colors && colors.length > 0) {
      where.colors = { hasSome: colors };
    }

    // Sizes Filter (hasSome for array)
    if (sizes && sizes.length > 0) {
      where.sizes = { hasSome: sizes };
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        skip: Number(skip),
        take: Number(take),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total };
  }

  async getMetadata() {
    const [categories, products] = await Promise.all([
      this.prisma.category.findMany(),
      this.prisma.product.findMany({ 
        select: { colors: true, sizes: true } 
      }),
    ]);

    const colors = Array.from(new Set(products.flatMap(p => p.colors)));
    const sizes = Array.from(new Set(products.flatMap(p => p.sizes)));

    return {
      categories,
      colors,
      sizes
    };
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...productData } = updateProductDto;
    
    const data: any = { ...productData };
    if (categoryId) {
      data.category = {
        connect: { id: categoryId },
      };
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
