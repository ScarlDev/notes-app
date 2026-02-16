import prisma from '../config/database';

export class NoteService {
    async createNote(userId: string, title: string, content: string) {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId,
            },
        });

        return note;
    }

    async getNotesByUserId(userId: string) {
        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return notes;
    }

    async getNoteById(noteId: string, userId: string) {
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                userId,
            },
        });

        if (!note) {
            throw new Error('Note not found');
        }

        return note;
    }

    async updateNote(noteId: string, userId: string, title?: string, content?: string) {
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                userId,
            },
        });

        if (!note) {
            throw new Error('Note not found');
        }

        const updatedNote = await prisma.note.update({
            where: { id: noteId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });

        return updatedNote;
    }

    async deleteNote(noteId: string, userId: string) {
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                userId,
            },
        });

        if (!note) {
            throw new Error('Note not found');
        }

        await prisma.note.delete({
            where: { id: noteId },
        });

        return { message: 'Note deleted successfully' };
    }
}
