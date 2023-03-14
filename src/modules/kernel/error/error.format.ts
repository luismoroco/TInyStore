import { Cart, Category, Like, Product, User } from '@prisma/client';

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

export const ErrorCategory: Category = {
  id: 0,
  name: '',
  description: '',
};

export const ErrorProduct: Product = {
  id: 0,
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  disabled: true,
  createdById: 0,
  categoryId: 0,
};
