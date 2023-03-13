import { Cart } from '@prisma/client';
import { CarTDAL } from './DAL';

export const CartService = {
  repository: new CarTDAL(),

  async addProduct(body: Cart): Promise<Cart> {
    const data = await this.repository.addItem(body);
    return data;
  },

  async findUnique(key: number): Promise<boolean> {
    const data = await this.repository.getOne(key);
    if (data) return true;
    return false;
  },

  async deleteItemFromCart(key: number): Promise<void> {
    await this.repository.deleteItem(key);
  },

  async updateItem(body: Cart, id: number): Promise<Cart> {
    const data = await this.repository.updateItem(body, id);
    return data;
  },

  async findManyWhere(key: number): Promise<Cart[]> {
    const data = await this.repository.getAllWhere(key);
    return data;
  },
};
