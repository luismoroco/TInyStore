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
export const orderDetailInstance = prismaInstance.client.orderDetails;
export const passTokenInstance = prismaInstance.client.passwordResetToken;
