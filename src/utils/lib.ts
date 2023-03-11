/**
 * This function check if two object
 * contain the same set of properties
 */

import prismaInstance from '../patterns/prisma.Singleton';

export const productInstance = prismaInstance.client.product;
export const categoryInstance = prismaInstance.client.category;
export const userInstance = prismaInstance.client.user;
export const productImgInstance = prismaInstance.client.productImage;
export const cartInstance = prismaInstance.client.cart;
export const orderInstance = prismaInstance.client.order;
export const likeInstance = prismaInstance.client.like;
export const mailInstance = prismaInstance.client.email;

export const findUniqueProduct = async (id: number) => {
  return await productInstance.findUnique({
    where: { id: id },
  });
};

export const findUniqueCategory = async (id: number) => {
  return await categoryInstance.findUnique({
    where: { id: id },
  });
};

export const findUniqueUser = async (id: number) => {
  return await userInstance.findUnique({
    where: { id: id },
  });
};

export const findUniqueCart = async (id: number) => {
  return await cartInstance.findUnique({
    where: { id: id },
  });
};

export function checkProperties(A: unknown, B: unknown) {
  return JSON.stringify(A) == JSON.stringify(B);
}
