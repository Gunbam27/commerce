import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Delivery to my home' })
  @IsOptional()
  @IsString()
  notes?: string;
}
