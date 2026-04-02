import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';
import type { RegisterDto, LoginDto } from '../schemas/auth.schema';
import { sendPasswordResetEmail } from '../utils/sendMail';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 10;

export async function register(dto: RegisterDto) {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw { status: 409, message: 'User with this email already exists' };

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: { name: dto.name, email: dto.email, passwordHash, role: 'USER' },
        select: { id: true, name: true, email: true, role: true },
    });

    return user;
}

export async function login(dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw { status: 401, message: 'Invalid email or password' };

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw { status: 401, message: 'Invalid email or password' };

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
}

export async function requestPasswordReset(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return;

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExpires: expires,
        },
    });

    await sendPasswordResetEmail(email, token);
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpires: { gt: new Date() },
        },
    });

    if (!user) {
        throw new Error('Invalid token');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            passwordHash,
            resetToken: null,
            resetTokenExpires: null,
        },
    });
}
