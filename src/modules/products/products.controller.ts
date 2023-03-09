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
    res.status(400).json({ msg: 'Error in createCategory' });
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

    body.createdById = req.userIdentify;
    body.categoryId = id;
    const newProduct = await prismaInstance.client.product.create({
      data: { ...body },
    });

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ msg: 'Error in createProducto Function' });
  }
};
