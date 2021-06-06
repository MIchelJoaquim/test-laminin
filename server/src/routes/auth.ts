import { Router } from 'express';

import { login, signup, tokenVerify } from '../controllers/auth';
import validateJWT from '../middleware/validateJwt';

const authRoutes: Router = Router();

authRoutes.post('/login', login);

authRoutes.get('/verify', validateJWT, tokenVerify);

authRoutes.post('/register', signup);

export default authRoutes;
