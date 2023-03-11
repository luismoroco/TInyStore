import { Request, Response } from 'express';
import {
  categoryInstance,
  findUniqueCategory,
  findUniqueProduct,
  productImgInstance,
  productInstance,
} from '../../utils/lib';

export const addCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newCategory = await categoryInstance.create({
      data: { ...body },
    });

    if (!newCategory) {
      res.status(400).json({ msg: `Category ${body.category} exist!` });
      return;
    }

    res.status(200).json(newCategory);
  } catch (error) {
    res
      .status(400)
      .json({ msg: 'Error in createCategory or Duplicate category' });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res.status(400).json({ msg: `Category doensn't exist!` });
      return;
    }

    body.createdById = req.userIdentify as number;
    body.categoryId = Number(id);
    body.category = existCategory?.name as string;
    const newProduct = await productInstance.create({
      data: { ...body },
    });

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ msg: 'Error in createProducto Function' });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'The product does not existe' });
      return;
    }

    const updateUser = await productInstance.update({
      where: { id: exist.id },
      data: { ...body },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(404).json({ msg: 'Error in updateProducto fx' });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    await productInstance.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json('Product Destroyed');
  } catch (error) {
    res.status(404).json({ msg: 'Error in deleteProducto' });
  }
};

export const disableProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const updated = await productInstance.update({
      where: { id: Number(id) },
      data: {
        disabled: true,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ msg: 'Error in disableProducto' });
  }
};

export const getProductosPerPage = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const totalCount = await productInstance.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    const data = await productInstance.findMany({
      take: pageSize,
      skip: offset,
    });

    res.status(200).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error in getProductos' });
  }
};

export const searchByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res.status(400).json({ msg: `Category doensn't exist!` });
      return;
    }

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const totalCount = await productInstance.count({
      where: {
        categoryId: Number(id),
      },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    const data = await productInstance.findMany({
      take: pageSize,
      skip: offset,
      where: {
        categoryId: Number(id),
      },
    });

    res.status(200).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error in searchByCategory' });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await findUniqueProduct(Number(id));
    if (!data) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const imgBelong = await productImgInstance.findMany({
      where: {
        productId: Number(id),
      },
    });
    res.status(200).json({ data, imgBelong });
  } catch (error) {
    res.status(500).json({ msg: 'Error in getProductsDetailed' });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const url = req.file?.path as string;
    const newImage = await productImgInstance.create({
      data: {
        url,
        productId: Number(id),
      },
    });
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json({ msg: 'Error in uploadImages' });
  }
};
