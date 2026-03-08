import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';
import type { RegisterDto, LoginDto } from '../schemas/auth.schema';

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
