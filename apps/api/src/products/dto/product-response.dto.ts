import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Guatemala Huehuetenango' })
  name: string;

  @ApiProperty({ example: 'Smooth and balanced coffee with notes of chocolate.', required: false, nullable: true })
  description: string | null;

  @ApiProperty({ example: 18000 })
  price: number;

  @ApiProperty({ example: 100 })
  stock: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], type: [String] })
  images: string[];

  @ApiProperty({ example: ['Black', 'Skyblue'], type: [String] })
  colors: string[];

  @ApiProperty({ example: ['S', 'M', 'L'], type: [String] })
  sizes: string[];

  @ApiProperty({ example: { roast: 'Medium', origin: 'Guatemala' } })
  attributes: any;

  @ApiProperty({ example: 1 })
  categoryId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];

  @ApiProperty({ example: 10 })
  total: number;
}
