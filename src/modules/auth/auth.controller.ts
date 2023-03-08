import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await prismaInstance.client.post.create({
      data: { ...body },
    });

    res.json('TODO GOD');
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
