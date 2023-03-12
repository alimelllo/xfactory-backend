import express from 'express';
import { messageController } from '../controllers';
import { Routes } from './routesStrings';
const router = express.Router();


router.get(Routes.messages, messageController.MessageList);

export default router;