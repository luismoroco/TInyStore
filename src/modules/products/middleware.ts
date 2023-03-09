/**
 *  Middleware for portect the products CRUD related routes, ONLY MANAGER can EDIT
 */

import { Request, Response, NextFunction } from 'express';

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role === 'CLIENT') {
    res.status(401).json('Access Denied! Manager ONLY!');
    return;
  }

  next();
};
