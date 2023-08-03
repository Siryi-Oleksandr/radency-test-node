import { Response, Request } from "express";
import { nanoid } from "nanoid";
import { HttpError, controllerWrapper, parseDates } from "helpers";
import { NotesService } from "services/NotesService";
import { INote } from "types/INote";

const notesService = new NotesService();

// * POST  /notes
const addNote = controllerWrapper(async (req: Request, res: Response) => {
  const id: string = nanoid();
  const dates = parseDates(req.body.content);
  const newNote: INote = { ...req.body, id, dates };
  const result = notesService.createNote(newNote);
  if (!result) {
    throw new HttpError(404, `Note have not created`);
  }
  res.status(201).json(newNote);
});

// * GET  /notes
const getNotes = controllerWrapper(async (_req: Request, res: Response) => {
  const notes = notesService.selectAllNotes();

  if (!notes) {
    throw new HttpError(404, `Notes not found`);
  }

  res.json(notes);
});

// * GET  /notes/:id
const getNoteById = controllerWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = notesService.selectNoteById(id);

  if (!note) {
    throw new HttpError(404, `Note not found`);
  }

  res.json(note);
});

// * PATCH  /notes:id
const updateNoteById = controllerWrapper(
  async (req: Request, res: Response) => {
    const id: string = nanoid();
    const dates = parseDates(req.body.content);
    const newNote: INote = { ...req.body, id, dates };
    const result = notesService.createNote(newNote);
    if (!result) {
      throw new HttpError(404, `Note have not created`);
    }
    res.status(201).json(newNote);
  }
);

// * DELETE  /notes/:id
const deleteNoteById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = notesService.deleteNoteById(id);

    if (!result) {
      throw new HttpError(404, `Task with "${id}" not found`);
    }

    res.json({ message: "Note deleted" });
  }
);

export { addNote, getNotes, getNoteById, updateNoteById, deleteNoteById };
