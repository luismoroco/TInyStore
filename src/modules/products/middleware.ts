/**
 *  Middleware for portect the products CRUD related routes, ONLY MANAGER can EDIT
 */

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role === 'CLIENT') {
    res.status(httpStatus.UNAUTHORIZED).json('Access Denied! Manager ONLY!');
    return;
  }

  next();
};
