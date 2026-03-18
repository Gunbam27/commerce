import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 'Large' })
  @IsOptional()
  @IsString()
  size?: string = '';

  @ApiPropertyOptional({ example: 'White' })
  @IsOptional()
  @IsString()
  color?: string = '';
}
