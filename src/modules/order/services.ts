import { Order, OrderDetails } from '@prisma/client';
import { OrderDAL } from './DAL';

export const OrderService = {
  repository: new OrderDAL(),

  async create(body: Order): Promise<Order> {
    const data = await this.repository.addItem(body);
    return data;
  },

  async getAllTheOrders() {
    const data = await this.repository.getAll();
    return data;
  },

  async getMyOrder(id: number): Promise<Order[]> {
    const data = await this.repository.getAllByUser(id);
    return data;
  },

  async getOrderDetailed(key: number): Promise<OrderDetails[]> {
    const data = await this.repository.getDetail(key);
    return data;
  },

  async getUnique(key: number): Promise<Order | unknown> {
    const data = this.repository.getOne(key);
    return data;
  },
};
