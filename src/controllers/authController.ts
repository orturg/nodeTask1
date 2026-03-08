import type { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/authService';

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
