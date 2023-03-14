import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ErrorCart } from '../kernel/error/error.format';
import { CartService } from './services';

class CartDriver {
  async addProductToCart(req: Request, res: Response) {
    const { body } = req;

    try {
      body.userId = req.userIdentify as number;
      const newItem = await CartService.addProduct(body);
      if (newItem === ErrorCart) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json('Bad o duplicate data');
        return;
      }
      res.status(httpStatus.CREATED).json(newItem);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in addProductToCart' });
    }
  }

  async deleteItemFromCart(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existItem = await CartService.findUnique(Number(id));
      if (!existItem || existItem === ErrorCart) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: 'Product Id in cart NOT EXIST!!!' });
        return;
      }

      await CartService.deleteItemFromCart(Number(id));
      res.status(httpStatus.OK).json({ msg: 'Item destroyed' });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in deleteItemFromCart' });
    }
  }

  async updateItemFromCart(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const exist = await CartService.findUnique(Number(id));
      if (!exist || exist === ErrorCart) {
        res
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ msg: 'Product Id in cart NOT EXIST!!!' });
        return;
      }
      const itemUpdted = await CartService.updateItem(body, Number(id));
      if (itemUpdted === ErrorCart) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ msg: 'BAD data!' });
        return;
      }
      res.status(httpStatus.OK).json({ msg: 'Item Updated', itemUpdted });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in updateItemFromCart' });
    }
  }

  async getMyOwnCarDescription(req: Request, res: Response) {
    const id = req.userIdentify as number;

    try {
      const myCart = await CartService.findManyWhere(id);
      if (!myCart) {
        res.status(httpStatus.OK).json('Your CART is EMPTY!');
        return;
      }

      res.status(httpStatus.OK).json(myCart);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getMyOwnCarDescription' });
    }
  }
}

export const cartDriver = new CartDriver();
