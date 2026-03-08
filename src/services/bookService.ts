import prisma from '../db/prisma';
import type { CreateBookDto, UpdateBookDto } from '../schemas/book.schema';

export async function findAll() {
    return prisma.book.findMany();
}

export async function findById(id: string) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw { status: 404, message: 'Book not found' };
    return book;
}

export async function create(dto: CreateBookDto) {
    const existing = await prisma.book.findUnique({ where: { isbn: dto.isbn } });
    if (existing) throw { status: 409, message: 'Book with this ISBN already exists' };

    return prisma.book.create({ data: { ...dto, available: true } });
}

export async function update(id: string, dto: UpdateBookDto) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw { status: 404, message: 'Book not found' };

    if (dto.isbn && dto.isbn !== book.isbn) {
        const existing = await prisma.book.findUnique({ where: { isbn: dto.isbn } });
        if (existing) throw { status: 409, message: 'Book with this ISBN already exists' };
    }

    return prisma.book.update({ where: { id }, data: dto });
}

export async function remove(id: string) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw { status: 404, message: 'Book not found' };

    const activeLoan = await prisma.loan.findFirst({
        where: { bookId: id, status: 'ACTIVE' },
    });
    if (activeLoan) throw { status: 400, message: 'Cannot delete book with active loans' };

    await prisma.book.delete({ where: { id } });
}
