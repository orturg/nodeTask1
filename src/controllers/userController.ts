import type { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/userService';
import {deleteUserAvatar, uploadUserAvatar} from '../services/userService';

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

export async function uploadAvatarHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'File is not loaded' });
            return;
        }

        const user = await uploadUserAvatar(req.user!.userId, req.file.filename);
        res.json({ message: 'Avatar has been updated', avatarUrl: user.avatarUrl });
    } catch (err) {
        next(err);
    }
}

export async function deleteAvatarHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await deleteUserAvatar(req.user!.userId);
        res.json({ message: 'Avatar has beem removed' });
    } catch (err) {
        next(err);
    }
}