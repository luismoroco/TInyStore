import { Cart, Like, User } from '@prisma/client';

export const ErrorLike: Like = {
  id: 0,
  userId: 0,
  productId: 0,
};

export const ErrorCart: Cart = {
  id: 0,
  userId: 0,
  productId: 0,
  quantity: 0,
};

export const ErroUser: User = {
  id: 0,
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  role: 'CLIENT',
};
