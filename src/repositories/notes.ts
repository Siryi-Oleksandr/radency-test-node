import { Response, Request } from "express";
import controllerWrapper from "helpers/controllerWrapper";
import { NotesService } from "services/NotesService";

const notesService = new NotesService();

// * GET  /notes

const getNotes = controllerWrapper(async (_req: Request, res: Response) => {
  const projects = notesService.getAllNotes();

  res.json(projects);
});

export { getNotes };
