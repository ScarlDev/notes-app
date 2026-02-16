import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', error.message);

    if (error instanceof ZodError) {
        res.status(400).json({
            error: 'Validation error',
            details: error.errors,
        });
        return;
    }

    if (error.message === 'User already exists') {
        res.status(409).json({ error: error.message });
        return;
    }

    if (error.message === 'Invalid credentials') {
        res.status(401).json({ error: error.message });
        return;
    }

    if (error.message === 'Note not found') {
        res.status(404).json({ error: error.message });
        return;
    }

    res.status(500).json({ error: 'Internal server error' });
};
