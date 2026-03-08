import express from "express";

import bookRoutes from "./books";
import userRoutes from "./users";
import loanRoutes from "./loans";
import authRoutes from './auth.routes';

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/loans", loanRoutes);
router.use('/auth', authRoutes);

export default router;