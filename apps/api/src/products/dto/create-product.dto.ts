import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Guatemala Huehuetenango' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smooth and balanced coffee with notes of chocolate.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 18000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: { roast: 'Medium', origin: 'Guatemala' }, required: false })
  @IsOptional()
  attributes?: any;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
