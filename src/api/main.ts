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
  res.status(httpStatus.OK).send('index');
});

router.post('/auth/signup', authDriver.signUp);
router.post('/auth/signin', authDriver.signIn);
router.get('/auth/profile', valToken, authDriver.profile);
router.put('/auth/signout', valToken, authDriver.signOut);

router.post('/products', valToken, authManager, prodDriver.create);
router.post('/categories', valToken, authManager, categoryDriver.addCategory);
router.put('/products/:id', valToken, authManager, prodDriver.update);
router.delete('/products/:id', valToken, authManager, prodDriver.delete);
router.put('/products/disable/:id', valToken, authManager, prodDriver.disable);
router.post('/products/:id/images', multer.single('image'), prodDriver.uplImg);

router.get('/products', prodDriver.getProductosPerPage);
router.get('/products/category/:id', prodDriver.searchByCategory);
router.get('/products/:id', prodDriver.getProductDetails);

router.post('/cart', valToken, authClient, cartDriver.addProductToCart);
router.delete('/cart/:id', valToken, authClient, cartDriver.deleteItemFromCart);
router.put('/cart/:id', valToken, authClient, cartDriver.updateItemFromCart);
router.get('/cart', valToken, authClient, cartDriver.getMyOwnCarDescription);

router.post('/like/:id', valToken, authClient, likeDriver.setLike);

router.post('/buy/:id', valToken, authClient, shopController.buyProducts);

router.get('/orders', valToken, authManager, orderContrller.getAllTheOrders);
router.get('/orders/:id', valToken, authClient, orderContrller.getMyOrder);

router.post('/password/recovery', authDriver.passwordForget);
router.put('/password/recovery', authDriver.processTheForgetPassword);

export default router;
