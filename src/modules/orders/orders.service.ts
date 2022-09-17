import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ListOrderRequestDto } from './dto/order.request.dto';

import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepositoy: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    return await this.orderRepositoy.create(createOrderDto);
  }

  async getOrders(orderRequest: ListOrderRequestDto) {
    return await this.orderRepositoy.find(orderRequest);
  }

  async getOrder(orderId: string) {
    return await this.orderRepositoy.findById(orderId);
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepositoy.findByIdAndUpdate(
      orderId,
      updateOrderDto,
      { new: true },
    );
  }

  async deleteOrder(orderId: string) {
    return await this.orderRepositoy.findByIdAndDelete(orderId);
  }
}
