import { Cart } from '@prisma/client';
import { cartInstance } from '../../utils/lib';
import { ErrorCart } from '../kernel/error/error.format';
import {
  IAddItem,
  IDeleteOne,
  IGetOne,
  IUpdate,
} from '../kernel/interfaces/interfaces';

export class CarTDAL
  implements
    IGetOne<Cart, number>,
    IDeleteOne<number>,
    IAddItem<Cart>,
    IUpdate<Cart, number>
{
  /**
   * GET items
   * @param {number} id - id Cart
   */

  async getOne(id: number): Promise<Cart | unknown> {
    try {
      const data = await cartInstance.findUnique({ where: { id: id } });
      return data;
    } catch (error) {
      return ErrorCart;
    }
  }

  /**
   * DELETE item
   * @param {number} id - id cart
   */

  async deleteItem(id: number): Promise<void> {
    await cartInstance.delete({ where: { id: id } });
  }

  /**
   * POST new item
   * @param {Cart} x - new cart body
   */

  async addItem(x: Cart): Promise<Cart> {
    const data = await cartInstance.create({ data: x });
    return data;
  }

  /**
   * PUT update item
   * @param {Cart} x - new body
   * @param {number} k - key
   */

  async updateItem(x: Cart, k: number): Promise<Cart> {
    const data = await cartInstance.update({
      where: { id: k },
      data: x,
    });
    return data;
  }

  /**
   * GET find All
   * @param {number}
   */

  async getAllWhere(id: number): Promise<Cart[]> {
    const data = await cartInstance.findMany({
      where: { userId: id },
    });
    return data;
  }
}
