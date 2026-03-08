import prisma from '../db/prisma';
import type { CreateLoanDto } from '../schemas/loan.schema';

export async function findAll(userId: string, role: string) {
    const where = role === 'ADMIN' ? {} : { userId };
    return prisma.loan.findMany({ where });
}

export async function create(dto: CreateLoanDto) {
    const book = await prisma.book.findUnique({ where: { id: dto.bookId } });
    if (!book) throw { status: 400, message: 'Book not found' };
    if (!book.available) throw { status: 400, message: 'Book is not available' };

    return prisma.$transaction(async (tx) => {
        const loan = await tx.loan.create({
            data: { userId: dto.userId, bookId: dto.bookId, status: 'ACTIVE' },
        });
        await tx.book.update({ where: { id: dto.bookId }, data: { available: false } });
        return loan;
    });
}

export async function returnLoan(id: string) {
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) throw { status: 404, message: 'Loan not found' };
    if (loan.status === 'RETURNED') throw { status: 400, message: 'Loan already returned' };

    return prisma.$transaction(async (tx) => {
        const updated = await tx.loan.update({
            where: { id },
            data: { status: 'RETURNED', returnDate: new Date() },
        });
        await tx.book.update({ where: { id: loan.bookId }, data: { available: true } });
        return updated;
    });
}
