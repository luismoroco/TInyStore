import { Router } from 'express';
import multer from '../config/multer';
import httpStatus from 'http-status';
import { valToken } from '../services/validateToken';
import { authManager } from '../middleware/manager';
import { authClient } from '../middleware/client';
import { authDriver } from '../modules/auth/controller';
import { prodDriver } from '../modules/product/controller';
import { categoryDriver } from '../modules/category/controllers';
import { cartDriver } from '../modules/cart/controller';
import { likeDriver } from '../modules/like/controller';
import { shopController } from '../modules/shop/shop';
import { orderContrller } from '../modules/order/controller';

const router: Router = Router();

router.get('/', (_, res) => {
  res.status(httpStatus.OK).json({ msg: 'index' });
});

router.post('/auth/signup', authDriver.signUp);
router.post('/auth/signin', authDriver.signIn);
router.get('/auth/profile', valToken, authDriver.profile);
router.put('/auth/signout', valToken, authDriver.signOut);

router.post('/products/:id', valToken, authManager, prodDriver.create);
router.post('/categories', valToken, authManager, categoryDriver.addCategory);
router.put('/products/:id', valToken, authManager, prodDriver.update);
router.delete('/products/:id', valToken, authManager, prodDriver.delete);
router.put('/products/disable/:id', valToken, authManager, prodDriver.disable);
router.get('/products/category/:id', prodDriver.searchByCategory);
router.get('/products/:id', prodDriver.getProductDetails);
router.post(
  '/products/img/:id',
  valToken,
  authManager,
  multer.single('image'),
  prodDriver.uplImg
);

router.get('/products', prodDriver.getProductosPerPage);

router.post('/cart', valToken, authClient, cartDriver.addProductToCart);
router.delete('/cart/:id', valToken, authClient, cartDriver.deleteItemFromCart);
router.put('/cart/:id', valToken, authClient, cartDriver.updateItemFromCart);
router.get('/cart', valToken, authClient, cartDriver.getMyOwnCarDescription);
router.put('/buy', valToken, authClient, shopController.buyProducts);

router.put('/like/:id', valToken, authClient, likeDriver.setLike);

router.get('/orders', valToken, authManager, orderContrller.getAllTheOrders);
router.get('/orders/cli', valToken, authClient, orderContrller.getMyOrder);
router.get(
  '/orders/cli/detail/:id',
  valToken,
  authClient,
  orderContrller.getDetilOfMyOrder
);

router.post('/password/recovery', authDriver.passwordForget);
router.put('/password/recovery', authDriver.processTheForgetPassword);

export default router;
