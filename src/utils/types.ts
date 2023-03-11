/**
 * The types used By the SYSTEM
 */

export type TUser = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  password: string;
  role?: string;
};

export type TProducto = {
  id: number;
  name?: string;
  description?: string;
  category?: string | number;
  price?: number;
  stock?: number;
  disabled?: boolean;
  createdById: number;
  categoryId: number;
};

export type TPassToken = {
  id: number;
  userId: number;
  token: string;
  createdAt: unknown | undefined;
};

export type TOrder = {
  id: number;
  uderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: unknown | undefined;
};

export type TNotify = {
  id: number;
  userId: number;
  productId: number;
  likedAt: unknown | undefined;
  sentAt: unknown | undefined;
  message: string;
};

export type TMail = {
  id: number;
  recipient: string;
  sender: string;
  subject: string;
  body: string;
  createdAt: unknown | undefined;
};

export type TLike = {
  id: number;
  userId: number;
  productId: number;
};

export type TImage = {
  id: number;
  url: string;
  productId: number;
};

export type TCart = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};

export type TCategory = {
  id?: number;
  name?: string;
  description?: string;
};
