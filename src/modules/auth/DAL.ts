import { User } from '@prisma/client';
import { userInstance } from '../../utils/lib';
import { ErroUser } from '../kernel/error/error.format';
import { IAddItem, IGetOne } from '../kernel/interfaces/interfaces';

export class AuthDAL implements IAddItem<User>, IGetOne<User, string> {
  /**
   * POST new user
   * @param {User} x - body new user
   */

  async addItem(x: User): Promise<User> {
    try {
      const data = await userInstance.create({
        data: { ...x },
      });
      return data;
    } catch (err) {
      return ErroUser;
    }
  }

  /**
   * GET a user
   * @param {User} x - email
   */

  async getOne(x: string): Promise<User | unknown> {
    try {
      const data = await userInstance.findUnique({
        where: { email: x },
      });
      return data;
    } catch (error) {
      return ErroUser;
    }
  }

  /**
   * POST for access to main perfil
   * @param {number} x - identifier
   */

  async getOneById(x: number): Promise<User | unknown> {
    try {
      const data = await userInstance.findUnique({
        where: { id: x },
      });
      return data;
    } catch (error) {
      return ErroUser;
    }
  }
}
