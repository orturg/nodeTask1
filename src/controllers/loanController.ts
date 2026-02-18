import type { Request, Response, NextFunction } from "express";
import * as LoanService from "../services/loanService";

type LoanParams = {
    id: string;
};

export function getLoans(req: Request, res: Response) {
    res.json({ data: LoanService.findAll() });
}

export function createLoan(req: Request, res: Response, next: NextFunction) {
    try {
        const loan = LoanService.create(req.body);
        res.status(201).json({ data: loan });
    } catch (err) {
        next(err);
    }
}

export function returnLoan(req: Request<LoanParams>, res: Response, next: NextFunction) {
    try {
        const loan = LoanService.returnLoan(req.params.id);
        res.json({ data: loan });
    } catch (err) {
        next(err);
    }
}