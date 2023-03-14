import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CategoryService } from '../category/services';
import { ErrorCategory, ErrorProduct } from '../kernel/error/error.format';
import { ProductService } from './services';

class ProductController {
  async create(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const existCategory = (await CategoryService.findCategoryById(
        Number(id)
      )) as Category;
      console.log(existCategory);
      if (!existCategory || existCategory === ErrorCategory) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: `Category doensn't exist!` });
        return;
      }

      const newProduct = await ProductService.addItem(
        [req.userIdentify, Number(id), existCategory?.name as string],
        body
      );
      if (newProduct === ErrorProduct) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: 'Error, BAD data' });
        return;
      }

      res.status(httpStatus.CREATED).json(newProduct);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in createProducto Function' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const exist = await ProductService.findUnique(Number(id));
      if (!exist) {
        res.status(httpStatus.OK).json({ msg: 'The product does not existe' });
        return;
      }

      const updateUser = await ProductService.updateOne(exist.id, body);
      res.status(httpStatus.OK).json(updateUser);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in updateProducto fx' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const exist = await ProductService.findUnique(Number(id));
      if (!exist) {
        res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
        return;
      }

      await ProductService.deleteOne(Number(id));
      res.status(httpStatus.OK).json('Product Destroyed');
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in deleteProducto' });
    }
  }

  async disable(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const exist = await ProductService.findUnique(Number(id));
      if (!exist) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: 'Product Id does NOT EXIST!' });
        return;
      }

      const updated = await ProductService.setDisable(Number(id));
      res.status(httpStatus.CREATED).json(updated);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in disableProducto' });
    }
  }

  async getProductosPerPage(req: Request, res: Response) {
    try {
      const data = await ProductService.queryPerPage(req);
      res.status(httpStatus.OK).json({ data });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getProductos' });
    }
  }

  async searchByCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existCategory = await ProductService.findUnique(Number(id));
      if (!existCategory) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: `Category doensn't exist!` });
        return;
      }

      const totalInPages = await ProductService.getCountBYCat(Number(1));
      const data = await ProductService.queryPageByCategory(req, Number(id));

      res.status(httpStatus.OK).json({
        data,
        totalInPages,
      });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in searchByCategory' });
    }
  }

  async getProductDetails(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await ProductService.findUnique(Number(id));
      if (!data || data === ErrorProduct) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ msg: 'Product Id does NOT EXIST!' });
        return;
      }

      const imgBelong = await ProductService.findImgs(Number(id));
      res.status(httpStatus.OK).json({ data, imgBelong });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getProductsDetailed' });
    }
  }

  async uplImg(req: Request, res: Response) {
    const { id } = req.params;

    try {
      console.log(id);
      const exist = await ProductService.findUnique(Number(id));
      if (!exist) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ msg: 'Product Id does NOT EXIST!' });
        return;
      }

      const url = req.file?.path as string;
      const newImage = await ProductService.upload(url, Number(id));
      res.status(httpStatus.CREATED).json({ msg: 'OK', newImage });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in uploadImages' });
    }
  }
}

export const prodDriver = new ProductController();
