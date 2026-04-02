import prisma from '../db/prisma';
import fs from 'fs';
import path from 'path';

export async function findAll() {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, avatarUrl: true },

    });
}

export async function findById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, avatarUrl: true },
    });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
}

export async function uploadUserAvatar(userId: string, filename: string) {
    const avatarUrl = `/uploads/avatars/${filename}`;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.avatarUrl) {
        const oldPath = path.join(process.cwd(), user.avatarUrl);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }

    return prisma.user.update({
        where: { id: userId },
        data: { avatarUrl },
        select: { id: true, email: true, name: true, role: true, avatarUrl: true },
    });
}

export async function deleteUserAvatar(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.avatarUrl) {
        throw Object.assign(new Error('Avatar is empty'), { status: 404 });
    }

    const filePath = path.join(process.cwd(), user.avatarUrl);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    return prisma.user.update({
        where: { id: userId },
        data: { avatarUrl: null },
    });
}