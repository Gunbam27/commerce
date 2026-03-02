import { Controller, Get, Post, Body, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order from cart' })
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user orders' })
  findAll(@Req() req) {
    return this.ordersService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id, req.user.userId);
  }
}
