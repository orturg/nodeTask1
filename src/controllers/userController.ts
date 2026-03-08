import type { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/userService';

type UserParams = { id: string };

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: await UserService.findAll() });
    } catch (err) {
        next(err);
    }
}

export async function getUserById(req: Request<UserParams>, res: Response, next: NextFunction) {
    try {
        res.json({ data: await UserService.findById(req.params.id) });
    } catch (err) {
        next(err);
    }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: await UserService.findById(req.user!.userId) });
    } catch (err) {
        next(err);
    }
}
