/**
 *  Middleware for portect the cart related routes, ONLY CLIENTS can BUY
 */

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const authClient = (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'MANAGER') {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json('Access Denied! ONLY CLIENTES can BUY!');
    return;
  }

  next();
};
