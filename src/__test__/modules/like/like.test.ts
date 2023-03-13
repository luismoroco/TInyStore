import { ErrorLike } from '../../../modules/kernel/error/error.format';
import { LikeService } from '../../../modules/like/services';

describe('Like TEST to FAIL', () => {
  it('Test The Like Service', async () => {
    const res = await LikeService.addNewLike([122, 3434]);
    expect(res).toEqual(ErrorLike);
  });

  it('Test The Like Service', async () => {
    const res = await LikeService.addNewLike([12, 3]);
    expect(res).toEqual(ErrorLike);
  });
});
