import express from 'express';
import * as UserController from '../controllers/userController';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/role.middleware';
import {deleteAvatarHandler, uploadAvatarHandler} from '../controllers/userController';
import {uploadAvatar} from '../middleware/upload.middleware';

const router = express.Router();

router.get('/me', authMiddleware, UserController.getMe);
router.get('/', authMiddleware, adminMiddleware, UserController.getUsers);
router.get('/:id', authMiddleware, adminMiddleware, UserController.getUserById);
router.post('/me/avatar', authMiddleware, uploadAvatar.single('avatar'), uploadAvatarHandler);
router.delete('/me/avatar', authMiddleware, deleteAvatarHandler);

export default router;
