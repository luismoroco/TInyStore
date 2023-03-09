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
} from '../modules/products/products.controller';
import { validateToken } from '../utils/validateToken';
import { authenticateAdmin } from '../modules/products/middleware';

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

router.get('/productos', getProductosPerPage);
router.get('/productos/:id', searchByCategory);

export default router;
