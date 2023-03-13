import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { LikeService } from './services';

class LikeController {
  async setLike(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data = await LikeService.addNewLike([
        Number(id),
        Number(req.userIdentify),
      ]);

      res.status(httpStatus.OK).json({ msg: 'OK', data });
    } catch (error) {
      res.status(500).json({ msg: 'Error in setLike' });
    }
  }
}

export const likeDriver = new LikeController();
