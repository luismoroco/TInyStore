import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newUser = await prismaInstance.client.post.create({
      data: { ...body },
    });

    const token = jwt.sign(
      { _id: newUser.id },
      process.env.JWT_SECRETE_KEY ?? 'ML/AI'
    ) as string;

    res.status(200).header('auth-header', token).json(newUser);
  } catch (error) {
    res.status(404).json({ msg: `Error in SignUp` });
  }
};

export const signIn = (_: Request, res: Response) => {
  res.send('signin');
};

export const profile = (_: Request, res: Response) => {
  res.send('profile');
};

export const signOut = (_: Request, res: Response) => {
  res.send('Bye');
};
