import { Router } from 'express';
import * as UserController from '../controllers/User.controller';

import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRoute = Router();

userRoute.post(
  '/register',
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  UserController.Register
);
userRoute.post(
  '/login',
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  UserController.Login
);

userRoute.get('/profile', authMiddleware, UserController.getProfile);
export { userRoute };
