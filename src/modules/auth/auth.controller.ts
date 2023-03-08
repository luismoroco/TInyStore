import { Request, Response } from 'express';

export const signUp = (req: Request, res: Response) => {
  res.send('signup');
};

export const signIn = (req: Request, res: Response) => {
  res.send('signin');
};

export const profile = (req: Request, res: Response) => {
  res.send('profile');
};

export const signOut = (req: Request, res: Response) => {
  res.send('Bye');
};
