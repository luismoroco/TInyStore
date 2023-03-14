import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { generateToken, verifyToken } from '../../services/tokens';
import { AuthService } from './services';
import jwt from 'jsonwebtoken';
import {
  passswordRecovery,
  updatePasswordRecovery,
} from '../../services/forgot.password';
import { IPayload } from '../kernel/types/types';
import { ErroUser } from '../kernel/error/error.format';

class AuthDriver {
  async signUp(req: Request, res: Response) {
    const { body } = req;

    try {
      const newUser = await AuthService.addNewUser(body);
      if (newUser === ErroUser) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: `User ${body.email} EXIST!, or BAD data` });
        return;
      }
      const token: string = generateToken(newUser.id, newUser.role);
      res.status(httpStatus.CREATED).header('auth-header', token).json(newUser);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: `Error in SignUp, or Duplicate Data` });
    }
  }

  async signIn(req: Request, res: Response) {
    const { body } = req;

    try {
      const isFound = (await AuthService.findUnique(body.email)) as User;
      if (isFound === ErroUser) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
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
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: `Error in SignIn` });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const authUser = (await AuthService.findUnique(req.userIdentify)) as User;
      if (authUser === ErroUser) {
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
  }

  async signOut(req: Request, res: Response) {
    const authToken = req.headers['auth-token'] as string;

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
  }

  async passwordForget(req: Request, res: Response) {
    const { body } = req;

    try {
      console.log(body);
      const userExist = (await AuthService.findUnique(body.email)) as User;
      if (!userExist || userExist === ErroUser) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json('The email NOT EXIST!');
        return;
      }

      console.log(userExist);

      const process = await passswordRecovery(userExist.id, body.email);
      if (!process) {
        res
          .status(httpStatus.SERVICE_UNAVAILABLE)
          .json('Error in REQUEST, try it later');
      }

      res
        .status(httpStatus.OK)
        .json(
          'Token sent to your EMAIL. Please, GET IT and read the instructions'
        );
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: `Error en passwordForget!` });
    }
  }

  async processTheForgetPassword(req: Request, res: Response) {
    const { body } = req;

    try {
      const authToken = req.headers['auth-token'] as string;
      const { role } = verifyToken(authToken) as IPayload;
      if (role !== body.email) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json('Incorrect EMAIL, incorrect or expired TOKEN');
        return;
      }

      const process = await updatePasswordRecovery(role, body.newpassword);
      if (!process) {
        res
          .status(httpStatus.SERVICE_UNAVAILABLE)
          .json('ERROR While trying to UPDATE. Try it later');
        return;
      }

      res.status(httpStatus.OK).json('OK, password CHANGUED');
    } catch (error) {
      res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        msg: `Incorrect EMAIL, incorrect or expired TOKEN, Error en processTheForgetPassword!`,
      });
    }
  }
}

export const authDriver = new AuthDriver();
