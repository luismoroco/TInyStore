import { Router } from 'express';
import {
  signIn,
  signUp,
  profile,
  signOut,
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
} from '../modules/products/products.controller';
import { validateToken } from '../utils/validateToken';
import { authenticateAdmin } from '../modules/products/middleware';
import multer from '../utils/multer.config';
import { authenticateClient } from '../modules/cart/middleware';
import {
  addProductToCart,
  deleteItemFromCart,
  getMyOwnCarDescription,
  updateItemFromCart,
} from '../modules/cart/cart.controller';
import { setLike } from '../modules/like/like.controller';

const router: Router = Router();

router.get('/', (_, res) => {
  res.status(200).send('index');
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

export default router;
