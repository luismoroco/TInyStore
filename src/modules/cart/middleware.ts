/**
 *  Middleware for portect the cart related routes, ONLY CLIENTS can BUY
 */

import { Request, Response, NextFunction } from 'express';

export const authenticateClient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role === 'MANAGER') {
    res.status(401).json('Access Denied! ONLY CLIENTES can BUY!');
    return;
  }

  next();
};
