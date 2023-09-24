import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  getAllOrders(): Promise<Order[]> {
    // this return all order however it should return by specific criteria(filter)
    return this.ordersRepository.find({});
  }

  getOrderById(id: string): Promise<Order> {
    return this.ordersRepository.findOneByOrFail({ id });
  }

  createNewOrder(orderInfo: OrderDto): Promise<Order> {
    return this.ordersRepository.save({
      ...orderInfo,
    });
  }
}
