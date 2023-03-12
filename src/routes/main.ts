import { Router } from 'express';
import {
  signIn,
  signUp,
  profile,
  signOut,
  passwordForget,
  processTheForgetPassword,
} from '../modules/auth/auth.controller';
import {
  createProducto,
  addCategory,
  updateProducto,
  deleteProducto,
  disableProducto,
  getProductosPerPage,
  searchByCategory,
  uploadImages,
  getProductDetails,
  buyProducts,
  getAllTheOrders,
  getMyOrder,
} from '../modules/products/products.controller';
import { authenticateAdmin } from '../modules/products/middleware';
import multer from '../config/multer';
import { authenticateClient } from '../modules/cart/middleware';
import {
  addProductToCart,
  deleteItemFromCart,
  getMyOwnCarDescription,
  updateItemFromCart,
} from '../modules/cart/cart.controller';
import { setLike } from '../modules/like/like.controller';
import httpStatus from 'http-status';
import { validateToken } from '../services/validateToken';

const router: Router = Router();

router.get('/', (_, res) => {
  res.status(httpStatus.OK).send('index');
});

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', validateToken, profile);
router.put('/signout', validateToken, signOut);

router.post('/pro/:id', validateToken, authenticateAdmin, createProducto);
router.post('/cate', validateToken, authenticateAdmin, addCategory);
router.put('/pro/:id', validateToken, authenticateAdmin, updateProducto);
router.delete('/pro/:id', validateToken, authenticateAdmin, deleteProducto);
router.put('/dis/:id', validateToken, authenticateAdmin, disableProducto);
router.post('/upfile/:id', multer.single('image'), uploadImages);

router.get('/productos', getProductosPerPage);
router.get('/productos/:id', searchByCategory);
router.get('/productos/detail/:id', getProductDetails);

router.post('/cart', validateToken, authenticateClient, addProductToCart);
router.delete(
  '/cart/:id',
  validateToken,
  authenticateClient,
  deleteItemFromCart
);
router.put('/cart/:id', validateToken, authenticateClient, updateItemFromCart);
router.get('/cart', validateToken, authenticateClient, getMyOwnCarDescription);

router.post('/like/:id', validateToken, authenticateClient, setLike);

router.post('/buy/:id', validateToken, authenticateClient, buyProducts);

router.get('/orders', validateToken, authenticateAdmin, getAllTheOrders);
router.get('/orders/:id', validateToken, authenticateClient, getMyOrder);

router.post('/recovery', passwordForget);
router.put('/recovery', processTheForgetPassword);

export default router;
