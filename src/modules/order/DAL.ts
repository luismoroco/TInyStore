import { Order, OrderDetails } from '@prisma/client';
import { orderInstance, orderDetailInstance } from '../../utils/lib';
import { IAddItem, IGetAll, IGetOne } from '../kernel/interfaces/interfaces';

export class OrderDAL
  implements IGetAll<Order>, IAddItem<Order>, IGetOne<Order, number>
{
  /**
   * POST item
   * @param {Order}
   */

  async addItem(x: Order): Promise<Order> {
    const data = await orderInstance.create({
      data: { ...x },
    });
    return data;
  }

  async getOne(x: number): Promise<Order | unknown> {
    const data = await orderInstance.findUnique({
      where: { id: x },
    });
    return data;
  }

  async getAll() {
    const data = await orderInstance.findMany({
      include: {
        details: true,
      },
    });
    return data;
  }

  async getAllByUser(x: number): Promise<Order[]> {
    const data = await orderInstance.findMany({
      where: { userId: x },
    });
    return data;
  }

  async getDetail(key: number): Promise<OrderDetails[]> {
    const data = await orderDetailInstance.findMany({
      where: { orderId: key },
    });
    return data;
  }
}
