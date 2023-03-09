import { Router } from 'express';
import {
  signIn,
  signUp,
  profile,
  signOut,
} from '../modules/auth/auth.controller';
import { validateToken } from '../utils/validateToken';

const router: Router = Router();

router.get('/', (_, res) => {
  res.send('GOD');
});

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', validateToken, profile);
router.put('/signout', signOut);

export default router;
