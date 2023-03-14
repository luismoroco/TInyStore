import { Product, ProductImage } from '@prisma/client';
import { productImgInstance, productInstance } from '../../utils/lib';
import { ErrorProduct } from '../kernel/error/error.format';
import {
  IAddItem,
  IDeleteOne,
  IGetOne,
  IUpdate,
} from '../kernel/interfaces/interfaces';

export class ProductDAL
  implements
    IAddItem<Product>,
    IGetOne<Product, number>,
    IUpdate<Product, number>,
    IDeleteOne<number>
{
  /**
   * POST item
   * @param {Product}
   */

  async addItem(x: Product): Promise<Product> {
    try {
      const data = await productInstance.create({
        data: { ...x },
      });
      return data;
    } catch (error) {
      return ErrorProduct;
    }
  }

  /**
   * GET a item
   * @param x - id
   */

  async getOne(x: number): Promise<Product | unknown> {
    try {
      const data = await productInstance.findUnique({
        where: { id: x },
      });
      return data;
    } catch (error) {
      return ErrorProduct;
    }
  }

  /**
   * PUT in a item
   * @param x - new body
   * @param k - id
   */

  async updateItem(x: Product, k: number): Promise<Product> {
    const data = await productInstance.update({
      where: { id: k },
      data: { ...x },
    });
    return data;
  }

  /**
   * DELETE a item
   * @param x - key
   */

  async deleteItem(x: number): Promise<void> {
    await productInstance.delete({
      where: {
        id: x,
      },
    });
  }

  /**
   * PUT a item, update
   * @param k - id
   */

  async setDisable(k: number): Promise<Product> {
    const data = await productInstance.update({
      where: { id: k },
      data: {
        disabled: true,
      },
    });
    return data;
  }

  /**
   * GET some items
   * @param {number} s - size per page
   * @param {number} of - offset
   */

  async findManyForPage(s: number, of: number): Promise<Product[]> {
    const data = await productInstance.findMany({
      take: s,
      skip: of,
    });
    return data;
  }

  /**
   * GET some items by category
   * @param {number} s - size
   * @param {number} of - offset
   * @param {number} id - key category
   */

  async findManyPerCategory(
    s: number,
    of: number,
    id: number
  ): Promise<Product[]> {
    const data = await productInstance.findMany({
      take: s,
      skip: of,
      where: {
        categoryId: id,
      },
    });
    return data;
  }

  /**
   * GET count
   */

  async count(): Promise<number> {
    const data = await productInstance.count();
    return data;
  }

  async countByCategory(key: number): Promise<number> {
    const data = await productInstance.count({
      where: { categoryId: key },
    });
    return data;
  }

  async getImgBelong(key: number): Promise<ProductImage[]> {
    const data = await productImgInstance.findMany({
      where: { productId: key },
    });
    return data;
  }

  async saveImg(url: string, key: number): Promise<ProductImage> {
    const data = await productImgInstance.create({
      data: {
        url,
        productId: key,
      },
    });
    return data;
  }
}
