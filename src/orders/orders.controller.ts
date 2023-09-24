import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAllOrders(): Promise<Array<Order>> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  createNewOrder(@Body() orderInfo: OrderDto): Promise<Order> {
    return this.ordersService.createNewOrder(orderInfo);
  }
}
