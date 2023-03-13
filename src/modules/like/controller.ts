import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ErrorLike } from '../kernel/error/error.format';
import { LikeService } from './services';

class LikeController {
  async setLike(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await LikeService.addNewLike([
        Number(id),
        Number(req.userIdentify),
      ]);

      if (!data || data === ErrorLike) {
        res.status(200).json('The id NOT exist!');
        return;
      }

      res.status(httpStatus.OK).json({ msg: 'OK', data });
    } catch (error) {
      res.status(500).json({ msg: 'Error in setLike' });
    }
  }
}

export const likeDriver = new LikeController();
