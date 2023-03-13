import { Product, ProductImage } from '@prisma/client';
import { Request } from 'express';
import { ProductDAL } from './DAL';

export const ProductService = {
  repository: new ProductDAL(),

  async findUnique(id: number): Promise<Product> {
    const data = (await this.repository.getOne(id)) as Product;
    return data;
  },

  async addItem(
    inf: [number, number, string],
    body: Product
  ): Promise<Product> {
    body.createdById = inf[0];
    body.categoryId = inf[1];
    body.category = inf[2];
    const data = await this.repository.addItem(body);
    return data;
  },

  async updateOne(key: number, body: Product): Promise<Product> {
    const data = this.repository.updateItem(body, key);
    return data;
  },

  async deleteOne(key: number): Promise<void> {
    await this.repository.deleteItem(key);
  },

  async setDisable(key: number): Promise<Product> {
    const data = await this.repository.setDisable(key);
    return data;
  },

  async queryPerPage(req: Request): Promise<Product[]> {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;
    const data = await this.repository.findManyForPage(pageSize, offset);

    return data;
  },

  async getCountBYCat(id: number): Promise<number> {
    const data = await this.repository.countByCategory(id);
    return data;
  },

  async queryPageByCategory(req: Request, id: number): Promise<Product[]> {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const offset = (page - 1) * pageSize;

    const data = await this.repository.findManyPerCategory(
      pageSize,
      offset,
      id
    );
    return data;
  },

  async findImgs(key: number): Promise<ProductImage[]> {
    const data = await this.repository.getImgBelong(key);
    return data;
  },

  async upload(url: string, key: number): Promise<ProductImage> {
    const data = await this.repository.saveImg(url, key);
    return data;
  },
};
