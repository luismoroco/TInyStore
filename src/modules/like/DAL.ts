import { Like } from '@prisma/client';
import { likeInstance } from '../../utils/lib';
import { ErrorLike } from '../kernel/error/error.format';
import { IAddItem } from '../kernel/interfaces/interfaces';

export class LikeDAL implements IAddItem<Like> {
  /**
   * POST like
   * @param {Like} x - new item
   */

  async addItem(x: Like): Promise<Like> {
    try {
      const data = await likeInstance.create({
        data: { ...x },
      });
      return data;
    } catch (error) {
      return ErrorLike;
    }
  }

  async searchTheLastLike(key: number) {
    const data = await likeInstance.findFirst({
      where: {
        productId: key,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        user: {
          select: {
            firstname: true,
            email: true,
          },
        },
      },
    });
    return data;
  }
}
