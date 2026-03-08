import express from 'express';
import * as UserController from '../controllers/userController';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/role.middleware';

const router = express.Router();

router.get('/me', authMiddleware, UserController.getMe);
router.get('/', authMiddleware, adminMiddleware, UserController.getUsers);
router.get('/:id', authMiddleware, adminMiddleware, UserController.getUserById);

export default router;
