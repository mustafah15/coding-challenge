import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderDto } from './order.dto';
import { KafkaPayload } from '../common/kafka/kafka.message';
import { KafkaService } from '../common/kafka/kafka.service';
import { CommunicationTopics } from '../communication-topics.enum';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly kafkaService: KafkaService,
  ) {}

  getAllOrders(): Promise<Order[]> {
    // this return all order however it should return by specific criteria(filter)
    return this.ordersRepository.find({});
  }

  getOrderById(id: string): Promise<Order> {
    return this.ordersRepository.findOneByOrFail({ id });
  }

  async createNewOrder(orderInfo: OrderDto): Promise<Order> {
    const createdOrder = await this.ordersRepository.save({
      ...orderInfo,
    });

    // this message should be a domain object if we are following ddd correctly
    // for this simple use case I will do simple mapping here
    const orderMessage = {
      email: createdOrder.userEmail,
      address: createdOrder.shippingAddress,
    };

    const payload: KafkaPayload = {
      messageId: createdOrder.id,
      body: orderMessage,
      messageType: 'order.placed',
    };

    await this.kafkaService.sendMessage(
      CommunicationTopics.ORDER_NOTIFICATIONS_TOPIC,
      payload,
    );

    return createdOrder;
  }
}
