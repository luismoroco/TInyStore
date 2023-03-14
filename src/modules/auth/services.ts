import { User } from '@prisma/client';
import { AuthDAL } from './DAL';

export const AuthService = {
  repository: new AuthDAL(),

  async addNewUser(body: User): Promise<User> {
    const data = this.repository.addItem(body);
    return data;
  },

  async findUnique(x: string | number): Promise<User | unknown> {
    let data;
    if (typeof x === 'string') {
      data = await this.repository.getOne(x);
      return data;
    }
    data = await this.repository.getOneById(x);
    return data;
  },

  noEquals(x: string, b: string): boolean {
    if (x !== b) return true;
    return false;
  },
};
