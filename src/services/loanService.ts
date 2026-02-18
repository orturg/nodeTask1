import { randomUUID } from "crypto";
import type { Loan } from "../types/loan";
import type { CreateLoanDto } from "../schemas/loan.schema";
import { BOOKS, USERS, LOANS, persistLoans, persistBooks } from "../storage";

export function findAll(): Loan[] {
    return LOANS;
}

export function create(dto: CreateLoanDto): Loan {
    const user = USERS.find((u) => u.id === dto.userId);
    if (!user) {
        throw { status: 400, message: "User not found" };
    }

    const book = BOOKS.find((b) => b.id === dto.bookId);
    if (!book) {
        throw { status: 400, message: "Book not found" };
    }

    if (!book.available) {
        throw { status: 400, message: "Book is not available" };
    }

    const activeLoan = LOANS.find(
        (loan) => loan.bookId === dto.bookId && loan.status === "ACTIVE",
    );
    if (activeLoan) {
        throw { status: 400, message: "Book already has an active loan" };
    }

    const loan: Loan = {
        id: randomUUID(),
        userId: dto.userId,
        bookId: dto.bookId,
        loanDate: new Date(),
        returnDate: null,
        status: "ACTIVE",
    };

    LOANS.push(loan);
    book.available = false;

    persistLoans();
    persistBooks();

    return loan;
}

export function returnLoan(id: string): Loan {
    const loan = LOANS.find((l) => l.id === id);
    if (!loan) {
        throw { status: 404, message: "Loan not found" };
    }

    if (loan.status === "RETURNED") {
        throw { status: 400, message: "Loan is already returned" };
    }

    loan.status = "RETURNED";
    loan.returnDate = new Date();

    const book = BOOKS.find((b) => b.id === loan.bookId);
    if (book) {
        book.available = true;
        persistBooks();
    }

    persistLoans();

    return loan;
}