import prisma from '../db/prisma';

export async function findAll() {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true },
    });
}

export async function findById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true },
    });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
}
