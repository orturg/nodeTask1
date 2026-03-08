import express from 'express';
import * as BookController from '../controllers/bookController';
import { validate } from '../middleware/validate';
import { createBookSchema, updateBookSchema } from '../schemas/book.schema';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/role.middleware';

const router = express.Router();
const jsonParser = express.json();

router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBookById);

router.post('/', authMiddleware, adminMiddleware, jsonParser, validate(createBookSchema), BookController.createBook);
router.put('/:id', authMiddleware, adminMiddleware, jsonParser, validate(updateBookSchema), BookController.updateBook);
router.delete('/:id', authMiddleware, adminMiddleware, BookController.deleteBook);

export default router;
