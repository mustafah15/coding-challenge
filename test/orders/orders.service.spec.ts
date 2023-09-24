import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrdersService } from '../../src/orders/orders.service';
import { Order } from '../../src/orders/order.entity';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository;

  const repositoryMockFactory = jest.fn(() => ({
    findOneByOrFail: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
  }));

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ordersService = app.get<OrdersService>(OrdersService);
    ordersRepository = app.get(getRepositoryToken(Order));
  });

  describe('getAllOrders', () => {
    test('it should return all orders', async () => {
      expect(ordersRepository.find).not.toHaveBeenCalled();
      ordersRepository.find.mockResolvedValue([]);
      const result = await ordersService.getAllOrders();
      expect(ordersRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('getOrderById', () => {
    test('it should return an order by id', async () => {
      expect(ordersRepository.findOneByOrFail).not.toHaveBeenCalled();
      ordersRepository.findOneByOrFail.mockResolvedValue(new Order());
      const result = await ordersService.getOrderById('someId');
      expect(ordersRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: 'someId',
      });
      expect(result).toStrictEqual(new Order());
    });
  });

  describe('createNewOrder', () => {
    test('it should call repository save', async () => {
      const orderDto = {
        userEmail: 'email@test.net',
        shippingAddress: 'user-address',
        products: ['5a5f459b-0568-4c82-aa08-dce96d5a9648'],
        totalPrice: 23,
      };
      expect(ordersRepository.save).not.toHaveBeenCalled();
      ordersRepository.save.mockResolvedValue({
        ...orderDto,
        id: '5a5f459b-0568-4c82-aa08-dce96d5a9648',
        createdAt: new Date(),
      });

      const result = await ordersService.createNewOrder(orderDto);

      expect(ordersRepository.save).toHaveBeenCalledWith({
        ...orderDto,
      });
      expect(result).toStrictEqual({
        ...orderDto,
        id: '5a5f459b-0568-4c82-aa08-dce96d5a9648',
        createdAt: new Date(),
      });
    });
  });
});
