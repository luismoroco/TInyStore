import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  cartInstance,
  mailInstance,
  orderDetailInstance,
  productInstance,
} from '../../utils/lib';
import { LikeService } from '../like/services';
import { OrderService } from '../order/services';

export const verifyIfThereLikes = async (
  avaibleCount: number,
  namePro: string,
  idP: number
) => {
  const userPutLikeToProduct = await LikeService.getTheLastLikeInProduct(idP);
  if (!userPutLikeToProduct) {
    return;
  }

  await mailInstance.create({
    data: {
      recipient: userPutLikeToProduct.user.email,
      sender: process.env.MAILER_USER || 'TINY STORE',
      subject: 'Notify',
      body: `Hi, ${userPutLikeToProduct.user.firstname}. There are only ${avaibleCount} units left of the ${namePro}!!`,
    },
  });
};

class ShopController {
  buyProducts = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const cartItems = await cartInstance.findMany({
        where: {
          userId: Number(id),
        },
        include: {
          product: {
            select: {
              name: true,
              price: true,
              stock: true,
              disabled: true,
            },
          },
        },
      });

      if (!cartItems || cartItems.length === 0) {
        res.status(httpStatus.OK).json('Yout cart is EMPTY!');
        return;
      }

      let total = 0;
      for (const item of cartItems) {
        if (
          item.quantity > item.product.stock &&
          item.product.disabled === false
        ) {
          res
            .status(httpStatus.NOT_ACCEPTABLE)
            .json(
              `There isn't stock for buy ${item.quantity} of ${item.product.name} OR is disabled`
            );
          return;
        }

        total += item.product.price * item.quantity;
      }

      const data = {
        userId: Number(id),
        total: total,
      };
      const myOrder = await OrderService.create(data as Order);
      const details = [];
      for (const item of cartItems) {
        details.push({
          orderId: Number(myOrder.id),
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        });
      }

      for (const item of cartItems) {
        const upItem = await productInstance.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (upItem.stock <= 3) {
          verifyIfThereLikes(upItem.stock, upItem.name, upItem.id);
        }
      }

      await cartInstance.deleteMany({
        where: {
          userId: Number(id),
        },
      });

      const order = await orderDetailInstance.createMany({
        data: details,
        skipDuplicates: true,
      });

      res
        .status(httpStatus.OK)
        .json({ msg: 'OK', total: `TOTAL: ${total}`, order, data, details });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in buyProducts' });
    }
  };
}

export const shopController = new ShopController();
