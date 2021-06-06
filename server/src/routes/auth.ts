import { Router } from 'express';

import { login, signup, tokenVerify } from '../controllers/auth';

const authRoutes: Router = Router();

authRoutes.post('/login', login);

authRoutes.get('/verify', tokenVerify);

authRoutes.post('/register', signup);

export default authRoutes;
