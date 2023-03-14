import { Like } from '@prisma/client';
import { LikeDAL } from './DAL';

export const LikeService = {
  repository: new LikeDAL(),

  async addNewLike(x: [number, number]): Promise<Like> {
    const data = {
      userId: x[0],
      productId: x[1],
    };
    const res = await this.repository.addItem(data as Like);
    return res;
  },

  async getTheLastLikeInProduct(key: number) {
    const data = await this.repository.searchTheLastLike(key);
    return data;
  },
};
