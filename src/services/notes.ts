import { Response, Request } from "express";
import { nanoid } from "nanoid";
import { HttpError, controllerWrapper, parseDates } from "helpers";
import { NotesService } from "repositories/NotesService";
import { INote } from "types/INote";

const notesService = new NotesService();

// * POST  /notes
const addNote = controllerWrapper(async (req: Request, res: Response) => {
  const id: string = nanoid();
  const dates = parseDates(req.body.content);
  const archived = false;
  const newNote: INote = { ...req.body, id, dates, archived };
  const result = notesService.createNote(newNote);
  if (!result) {
    throw new HttpError(404, `Note have not created`);
  }
  res.status(201).json(newNote);
});

// * GET  /notes
const getNotes = controllerWrapper(async (_req: Request, res: Response) => {
  const notes = notesService.selectAllNotes();

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

// * GET  /notes/stats
const getStatistics = controllerWrapper(
  async (_req: Request, res: Response) => {
    const stats = notesService.getCountTasks();

    res.json(stats);
  }
);

// * PATCH  /notes:id
const updateNoteById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const dates = parseDates(req.body.content);
    const updatedNote: INote = { ...req.body, id, dates };
    const result = notesService.updateNoteById(id, updatedNote);
    if (!result) {
      throw new HttpError(404, `Note with "${id}" not found`);
    }
    res.json(updatedNote);
  }
);

// * DELETE  /notes/:id
const deleteNoteById = controllerWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = notesService.deleteNoteById(id);

    if (!result) {
      throw new HttpError(404, `Note with "${id}" not found`);
    }

    res.json({ message: "Note deleted" });
  }
);

export {
  addNote,
  getNotes,
  getNoteById,
  getStatistics,
  updateNoteById,
  deleteNoteById,
};
