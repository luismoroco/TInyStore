import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CategoryService } from './services';

class CategoryDriver {
  async addCategory(req: Request, res: Response) {
    const { body } = req;

    try {
      const newCategory = await CategoryService.addCategory(body);
      if (!newCategory) {
        res
          .status(httpStatus.OK)
          .json({ msg: `Category ${body.category} exist or BAD values!` });
        return;
      }

      res.status(httpStatus.CREATED).json(newCategory);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in createCategory or Duplicate category' });
    }
  }
}

export const categoryDriver = new CategoryDriver();
