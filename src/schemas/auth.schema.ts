import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('INvalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters lengtgh'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
});

export const requestPasswordResetSchema = z.object({
    email: z.string().email('Invalid email'),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters lengtgh'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
