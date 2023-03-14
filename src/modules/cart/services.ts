import { Cart } from '@prisma/client';
import { ErrorCart } from '../kernel/error/error.format';
import { CarTDAL } from './DAL';

export const CartService = {
  repository: new CarTDAL(),

  async addProduct(body: Cart): Promise<Cart> {
    try {
      const data = await this.repository.addItem(body);
      return data;
    } catch (error) {
      return ErrorCart;
    }
  },

  async findUnique(key: number): Promise<Cart> {
    try {
      const data = (await this.repository.getOne(key)) as Cart;
      return data;
    } catch (error) {
      return ErrorCart;
    }
  },

  async deleteItemFromCart(key: number): Promise<void> {
    await this.repository.deleteItem(key);
  },

  async updateItem(body: Cart, id: number): Promise<Cart> {
    try {
      const data = await this.repository.updateItem(body, id);
      return data;
    } catch (error) {
      return ErrorCart;
    }
  },

  async findManyWhere(key: number): Promise<Cart[]> {
    const data = await this.repository.getAllWhere(key);
    return data;
  },
};
