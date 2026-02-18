import * as z from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    year: z.number().int().min(1000).max(new Date().getFullYear() + 1),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
});

export const updateBookSchema = z.object({
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    year: z.number().int().min(1000).max(new Date().getFullYear() + 1).optional(),
    isbn: z.string().min(10).optional(),
    available: z.boolean().optional(),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
