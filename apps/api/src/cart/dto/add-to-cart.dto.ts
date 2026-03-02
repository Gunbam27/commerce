import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({ example: 1, default: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
