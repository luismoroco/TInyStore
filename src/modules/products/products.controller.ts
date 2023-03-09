import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';

export const addCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newCategory = await prismaInstance.client.category.create({
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
    const existCategory = await prismaInstance.client.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existCategory) {
      res.status(400).json({ msg: `Category doensn't exist!` });
      return;
    }

    body.createdById = req.userIdentify as number;
    body.categoryId = Number(id);
    body.category = existCategory?.name as string;
    const newProduct = await prismaInstance.client.product.create({
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
    const exist = await prismaInstance.client.product.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      res.status(400).json({ msg: 'The product does not existe' });
      return;
    }

    const updateUser = await prismaInstance.client.product.update({
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
    const exist = prismaInstance.client.product.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    await prismaInstance.client.product.delete({
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
    const exist = prismaInstance.client.product.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const updated = await prismaInstance.client.product.update({
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
