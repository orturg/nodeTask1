import { randomUUID } from "crypto";
import type { Book } from "../types/book";
import type { CreateBookDto, UpdateBookDto } from "../schemas/book.schema";
import { BOOKS, LOANS, persistBooks } from "../storage";

export function findAll(): Book[] {
    return BOOKS;
}

export function findById(id: string): Book | undefined {
    return BOOKS.find((book) => book.id === id);
}

export function create(dto: CreateBookDto): Book {
    const existing = BOOKS.find((b) => b.isbn === dto.isbn);
    if (existing) {
        throw { status: 409, message: "Book with this ISbN already exists" };
    }

    const book: Book = { id: randomUUID(), ...dto, available: true };
    BOOKS.push(book);
    persistBooks();
    return book;
}

export function update(id: string, dto: UpdateBookDto): Book {
    const index = BOOKS.findIndex((b) => b.id === id);
    if (index === -1) {
        throw { status: 404, message: "Book not found" };
    }

    if (dto.isbn && dto.isbn !== BOOKS[index].isbn) {
        const existing = BOOKS.find((b) => b.isbn === dto.isbn);
        if (existing) {
            throw { status: 409, message: "Book with this ISBN already exists" };
        }
    }

    BOOKS[index] = { ...BOOKS[index], ...dto };
    persistBooks();
    return BOOKS[index];
}

export function remove(id: string): void {
    const index = BOOKS.findIndex((b) => b.id === id);
    if (index === -1) {
        throw { status: 404, message: "Book not found" };
    }

    const activeLoan = LOANS.find(
        (loan) => loan.bookId === id && loan.status === "ACTIVE",
    );
    if (activeLoan) {
        throw { status: 400, message: "Cannot delete book with active loans" };
    }

    BOOKS.splice(index, 1);
    persistBooks();
}
