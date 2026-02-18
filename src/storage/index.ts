import type { Book } from "../types/book";
import type { User } from "../types/user";
import type { Loan } from "../types/loan";
import { loadCollection, saveCollection } from "./jsonStorage";

export const BOOKS: Book[] = loadCollection<Book>("books");
export const USERS: User[] = loadCollection<User>("users");
export const LOANS: Loan[] = loadCollection<Loan>("loans");

export function persistBooks(): void {
    saveCollection("books", BOOKS);
}

export function persistUsers(): void {
    saveCollection("users", USERS);
}

export function persistLoans(): void {
    saveCollection("loans", LOANS);
}