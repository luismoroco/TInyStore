import { Request, Response } from 'express';
import { generateToken } from '../../utils/tokens';
import { findUniqueUser, userInstance } from '../../utils/lib';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newUser = await userInstance.create({
      data: { ...body },
    });

    const token: string = generateToken(newUser.id, newUser.role);
    res.status(httpStatus.CREATED).header('auth-header', token).json(newUser);
  } catch (error) {
    res.status(httpStatus.SERVICE_UNAVAILABLE).json({ msg: `Error in SignUp` });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const isFound = await userInstance.findUnique({
      where: { email: body.email },
    });

    if (!isFound) {
      res
        .status(httpStatus.OK)
        .json({ msg: `User ${body.email} doesn't exist` });
      return;
    }

    if (isFound?.password !== body.password) {
      res.status(httpStatus.FORBIDDEN).json({ msg: `Incorrect passsword` });
      return;
    }

    const token: string = generateToken(isFound?.id || 0x6, isFound?.role);
    res.status(httpStatus.CREATED).header('auth-token', token).json(isFound);
  } catch (error) {
    res.status(httpStatus.SERVICE_UNAVAILABLE).json({ msg: `Error in SignIn` });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const authUser = await findUniqueUser(req.userIdentify);
    if (!authUser) {
      res.status(httpStatus.OK).json(`User not exist!`);
      return;
    }

    res
      .status(httpStatus.OK)
      .send(`<h1>Welcome To Profile, ${authUser.firstname}<h1>`);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: `Error in profile!` });
  }
};

export const signOut = (req: Request, res: Response) => {
  const authToken = req.headers['auth-token'] as string;
  console.log(authToken);

  try {
    jwt.sign(
      authToken,
      process.env.JWT_SECRETE_KEY ?? 'ML/AI',
      { expiresIn: 1 },
      (isLogout, _error) => {
        if (isLogout) {
          res.status(httpStatus.OK).send({ msg: 'You have been Logout!' });
          return;
        }
      }
    );
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: `Error en signOut!` });
  }
};
