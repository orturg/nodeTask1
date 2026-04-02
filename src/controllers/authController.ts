import type { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/authService';
import {requestPasswordResetSchema, resetPasswordSchema} from '../schemas/auth.schema';
import {requestPasswordReset, resetPassword} from '../services/authService';

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ data: user });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function requestPasswordResetHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email } = requestPasswordResetSchema.parse(req.body);
        await requestPasswordReset(email);
        res.json({ message: 'Instructions have been sent' });
    } catch (err) {
        next(err);
    }
}

export async function resetPasswordHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { token, password } = resetPasswordSchema.parse(req.body);
        await resetPassword(token, password);
        res.json({ message: 'Password has been changed' });
    } catch (err) {
        next(err);
    }
}