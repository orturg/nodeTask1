import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export function validate(schema: ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Validation error",
                details: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        req.body = result.data;
        next();
    };
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err.status && err.message) {
        return res.status(err.status).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
