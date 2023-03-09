import { Request, Response } from 'express';
import prismaInstance from '../../patterns/prisma.Singleton';
import { generateToken } from '../../utils/tokens';

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newUser = await prismaInstance.client.user.create({
      data: { ...body },
    });

    const token: string = generateToken(newUser.id);
    res.status(200).header('auth-header', token).json(newUser);
  } catch (error) {
    res.status(404).json({ msg: `Error in SignUp` });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const isFound = await prismaInstance.client.user.findUnique({
      where: { email: body.email },
    });

    if (!isFound) {
      res.status(400).json({ msg: `User ${body.email} doesn't exist` });
      return;
    }

    if (isFound?.password !== body.password) {
      res.status(400).json({ msg: `Incorrect passsword` });
      return;
    }

    const token: string = generateToken(isFound?.id || 0x6);
    res.status(200).header('auth-token', token).json(isFound);
  } catch (error) {
    res.status(404).json({ msg: `Error in SignIn` });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const authUser = await prismaInstance.client.user.findUnique({
      where: { id: req.userIdentify },
    });

    if (!authUser) {
      res.status(400).json(`User not exist!`);
      return;
    }

    res.send(`<h1>Welcome To Profile, ${authUser.firstname}<h1>`);
  } catch (error) {
    res.status(404).json({ msg: `Error in profile!` });
  }
};

export const signOut = (_: Request, res: Response) => {
  res.send('Bye');
};
