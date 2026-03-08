import express from 'express';
import * as AuthController from '../controllers/authController';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validate(registerSchema), AuthController.register);
router.post('/login', jsonParser, validate(loginSchema), AuthController.login);

export default router;
