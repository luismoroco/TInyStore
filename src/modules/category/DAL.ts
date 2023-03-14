import { Category } from '@prisma/client';
import { categoryInstance } from '../../utils/lib';
import { ErrorCategory } from '../kernel/error/error.format';
import { IAddItem, IGetOne } from '../kernel/interfaces/interfaces';

export class CategoryDAL
  implements IAddItem<Category>, IGetOne<Category, number>
{
  /**
   * POST Category
   * @param {Category} x - new item
   */

  async addItem(x: Category): Promise<Category> {
    try {
      const data = await categoryInstance.create({
        data: { ...x },
      });
      return data;
    } catch (error) {
      return ErrorCategory;
    }
  }

  /**
   * GET Category
   * @param {number} x - id
   */

  async getOne(x: number): Promise<Category | unknown> {
    try {
      const data = await categoryInstance.findUnique({
        where: { id: x },
      });
      return data;
    } catch (error) {
      return ErrorCategory;
    }
  }
}
