import type { Request, Response, NextFunction } from 'express';
import * as BookService from '../services/bookService';

type BookParams = { id: string };

export async function getBooks(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: await BookService.findAll() });
    } catch (err) { next(err); }
}

export async function getBookById(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        res.json({ data: await BookService.findById(req.params.id) });
    } catch (err) { next(err); }
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(201).json({ data: await BookService.create(req.body) });
    } catch (err) { next(err); }
}

export async function updateBook(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        res.json({ data: await BookService.update(req.params.id, req.body) });
    } catch (err) { next(err); }
}

export async function deleteBook(req: Request<BookParams>, res: Response, next: NextFunction) {
    try {
        await BookService.remove(req.params.id);
        res.status(204).end();
    } catch (err) { next(err); }
}
