import type { Request, Response, NextFunction } from "express";
import * as BookService from "../services/bookService";


export function getBooks(req: Request, res: Response) {
    res.json({ data: BookService.findAll() });
}

export function getBookById(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        const book = BookService.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ data: book });
    } catch (err) {
        next(err);
    }
}

export function createBook(req: Request, res: Response, next: NextFunction) {
    try {
        const book = BookService.create(req.body);
        res.status(201).json({ data: book });
    } catch (err) {
        next(err);
    }
}

export function updateBook(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        const book = BookService.update(req.params.id, req.body);
        res.json({ data: book });
    } catch (err) {
        next(err);
    }
}

export function deleteBook(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        BookService.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

type BookParams = {
    id: string;
};