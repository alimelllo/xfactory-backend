import express from 'express';
import { authController, userController } from '../controllers';
import { Routes } from './routesStrings';
const router = express.Router();

router.post(Routes.login, authController.UserLogin);
router.post(Routes.register, authController.UserRegister);
router.get(Routes.users, userController.UsersList);

export default router;
