import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const createNoteSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});

export const updateNoteSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
});
