import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../utils/validation';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const result = await authService.register(validatedData.email, validatedData.password, validatedData.name);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const result = await authService.login(validatedData.email, validatedData.password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
