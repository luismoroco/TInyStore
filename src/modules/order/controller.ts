import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { OrderService } from './services';

class OrderController {
  async getAllTheOrders(_: Request, res: Response) {
    try {
      const orders = await OrderService.getAllTheOrders();
      if (!orders) {
        res.status(httpStatus.OK).json('The are NOT orders yet!');
        return;
      }

      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getAllOrders' });
    }
  }

  async getMyOrder(req: Request, res: Response) {
    try {
      const orders = await OrderService.getMyOrder(req.userIdentify);
      if (!orders || orders.length === 0) {
        res.status(httpStatus.OK).json({ msg: 'The are NOT orders yet' });
        return;
      }

      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getMyOrder' });
    }
  }

  async getDetilOfMyOrder(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const order = await OrderService.getUnique(Number(id));
      if (!order) {
        res.status(httpStatus.OK).json({ msg: 'The are NOT orders yet!' });
        return;
      }

      const data = await OrderService.getOrderDetailed(Number(id));
      res.status(httpStatus.OK).json({ order, data });
    } catch (error) {
      res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ msg: 'Error in getMyOrderDetailed' });
    }
  }
}

export const orderContrller = new OrderController();
