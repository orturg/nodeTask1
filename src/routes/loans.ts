import express from 'express';
import * as LoanController from '../controllers/loanController';
import { validate } from '../middleware/validate';
import { createLoanSchema } from '../schemas/loan.schema';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const jsonParser = express.json();

router.get('/', authMiddleware, LoanController.getLoans);
router.post('/', authMiddleware, jsonParser, validate(createLoanSchema), LoanController.createLoan);
router.post('/:id/return', authMiddleware, LoanController.returnLoan);

export default router;
