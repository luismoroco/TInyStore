import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';

export const setLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prismaInstance.client.like.create({
      data: {
        productId: Number(id),
        userId: Number(req.userIdentify),
      },
    });

    res.status(200).json('OK');
  } catch (error) {
    res.status(500).json({ msg: 'Error in setLike' });
  }
};
