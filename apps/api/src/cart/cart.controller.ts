import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add product to cart' })
  addToCart(@Req() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, addToCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Patch(':productId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  updateQuantity(
    @Req() req,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateQuantity(req.user.userId, productId, updateCartItemDto);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
