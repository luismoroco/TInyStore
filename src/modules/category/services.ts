import { Category } from '@prisma/client';
import { CategoryDAL } from './DAL';

export const CategoryService = {
  repository: new CategoryDAL(),

  async addCategory(body: Category): Promise<Category> {
    const data = await this.repository.addItem(body);
    return data;
  },

  async findCategoryById(id: number): Promise<Category | unknown> {
    const data = await this.repository.getOne(id);
    return data;
  },
};
