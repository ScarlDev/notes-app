import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { NoteService } from '../services/note.service';
import { createNoteSchema, updateNoteSchema } from '../utils/validation';

const noteService = new NoteService();

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = createNoteSchema.parse(req.body);
        const note = await noteService.createNote(req.userId!, validatedData.title, validatedData.content);
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

export const getNotes = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notes = await noteService.getNotesByUserId(req.userId!);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNoteById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const note = await noteService.getNoteById(req.params.id, req.userId!);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = updateNoteSchema.parse(req.body);
        const note = await noteService.updateNote(req.params.id, req.userId!, validatedData.title, validatedData.content);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await noteService.deleteNote(req.params.id, req.userId!);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
