import { User } from '@prisma/client';
import { ErroUser } from '../kernel/error/error.format';
import { AuthDAL } from './DAL';

export const AuthService = {
  repository: new AuthDAL(),

  async addNewUser(body: User): Promise<User> {
    try {
      const data = this.repository.addItem(body);
      return data;
    } catch (error) {
      return ErroUser;
    }
  },

  async findUnique(x: string | number): Promise<User | unknown> {
    let data;
    if (typeof x === 'string') {
      data = await this.repository.getOne(x);
      return data;
    }
    data = await this.repository.getOneById(1);
    return data;
  },

  noEquals(x: string, b: string): boolean {
    if (x !== b) return true;
    return false;
  },
};
