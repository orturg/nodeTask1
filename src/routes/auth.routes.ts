import express from 'express';
import * as AuthController from '../controllers/authController';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import {requestPasswordResetHandler, resetPasswordHandler} from '../controllers/authController';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validate(registerSchema), AuthController.register);
router.post('/login', jsonParser, validate(loginSchema), AuthController.login);
router.post('/request-password-reset', requestPasswordResetHandler);
router.post('/reset-password', resetPasswordHandler);

export default router;
