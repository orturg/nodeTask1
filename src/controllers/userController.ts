import type { Request, Response, NextFunction } from "express";
import * as UserService from "../services/userService";

type UserParams = {
    id: string;
};

export function getUsers(req: Request, res: Response) {
    res.json({ data: UserService.findAll() });
}

export function getUserById(req: Request<UserParams>, res: Response, next: NextFunction) {
    try {
        const user = UserService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ data: user });
    } catch (err) {
        next(err);
    }
}

export function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = UserService.create(req.body);
        res.status(201).json({ data: user });
    } catch (err) {
        next(err);
    }
}