import { Router } from 'express';
import * as UserController from '../controllers/User.controller';

import { body } from 'express-validator';

const userRoute = Router();

userRoute.post(
  '/register',
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  UserController.Register 
);

export {userRoute};
