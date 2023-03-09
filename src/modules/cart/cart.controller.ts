import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';

export const addProductToCart = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    body.userId = req.userIdentify as number;
    const newItem = await prismaInstance.client.cart.create({
      data: { ...body },
    });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({ msg: 'Error in addProductToCart' });
  }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existItem = prismaInstance.client.cart.findUnique({
      where: { id: Number(id) },
    });

    if (!existItem) {
      res.status(400).json({ msg: 'Product Id in cart NOT EXIST!' });
      return;
    }

    await prismaInstance.client.cart.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ msg: 'Item destroyed' });
  } catch (error) {
    res.status(500).json({ msg: 'Error in deleteItemFromCart' });
  }
};

export const updateItemFromCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const exist = prismaInstance.client.cart.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      res.status(400).json({ msg: 'Product Id in cart NOT EXIST!' });
      return;
    }

    const itemUpdted = await prismaInstance.client.cart.update({
      where: { id: Number(id) },
      data: { ...body },
    });

    res.status(200).json({ msg: 'Item Updated', itemUpdted });
  } catch (error) {
    res.status(500).json({ msg: 'Error in deleteItemFromCart' });
  }
};

export const getMyOwnCarDescription = async (req: Request, res: Response) => {
  const id = req.userIdentify as number;

  try {
    const myCart = await prismaInstance.client.cart.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(myCart);
  } catch (error) {
    res.status(500).json({ msg: 'Error in getMyOwnCarDescription' });
  }
};
