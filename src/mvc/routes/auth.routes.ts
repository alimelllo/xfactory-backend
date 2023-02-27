import express from 'express';
import { authController, messageController, userController } from '../controllers';
import { Routes } from './routesStrings';
const router = express.Router();

router.post(Routes.login, authController.UserLogin);
router.post(Routes.register, authController.UserRegister);
router.get(Routes.users, userController.UsersList);
router.post(Routes.addFriend, userController.AddFriend);
router.post(Routes.currentUserInfo, userController.currentUserInfo);

export default router;
