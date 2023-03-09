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

router.post('/products', validateToken, authenticateAdmin, createProducto);
router.post('/categories/:id', authenticateAdmin, addCategory);

export default router;
