import express from "express";
import {
  addNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "repositories/notes";
import isValidBody from "middlewares/isValidBody";
import { joiService } from "services/JoiService";

const router = express.Router();

router.post("/", isValidBody(joiService.noteSchema), addNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNoteById);

export default router;
