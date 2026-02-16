import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from '../controllers/note.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
