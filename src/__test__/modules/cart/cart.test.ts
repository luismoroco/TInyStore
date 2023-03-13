import { Cart } from '@prisma/client';
import { CartService } from '../../../modules/cart/services';
import { ErrorCart } from '../../../modules/kernel/error/error.format';

describe('CART TEST to FAIL in ADD, UPDATE', () => {
  it('ADD!', async () => {
    const res = await CartService.addProduct({
      id: 1,
      productId: 30,
      quantity: 3434,
      userId: 1223,
    });
    expect(res).toEqual(ErrorCart);
  });

  it('ADD!', async () => {
    const res = await CartService.addProduct({
      id: -51,
      productId: 30,
      quantity: 3434,
      userId: 13,
    });
    expect(res).toEqual(ErrorCart);
  });
});

describe('CART TEST to FAIL in UPDATE', () => {
  it('UPDATE!', async () => {
    const res = await CartService.updateItem(
      {
        productId: 1116611,
        quantity: 3434,
        userId: 0,
      } as Cart,
      111
    );
    expect(res).toEqual(ErrorCart);
  });
});
