import { Router } from 'express';
//import { signIn, signUp } from '../modules/auth/auth.controller';

const router: Router = Router();

router.get('/', (_, res) => {
  res.send('GOD');
});

export default router;
