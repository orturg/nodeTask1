import type { Request, Response, NextFunction } from 'express';
import * as LoanService from '../services/loanService';

type LoanParams = { id: string };

export async function getLoans(req: Request, res: Response, next: NextFunction) {
    try {
        const loans = await LoanService.findAll(req.user!.userId, req.user!.role);
        res.json({ data: loans });
    } catch (err) {
        next(err);
    }
}

export async function createLoan(req: Request, res: Response, next: NextFunction) {
    try {
        const loan = await LoanService.create({ ...req.body, userId: req.user!.userId });
        res.status(201).json({ data: loan });
    } catch (err) {
        next(err);
    }
}

export async function returnLoan(req: Request<LoanParams>, res: Response, next: NextFunction) {
    try {
        res.json({ data: await LoanService.returnLoan(req.params.id) });
    } catch (err) {
        next(err);
    }
}
