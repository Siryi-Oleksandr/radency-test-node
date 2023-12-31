import express from "express";
import {
  addNote,
  getNotes,
  getNoteById,
  getStatistics,
  updateNoteById,
  deleteNoteById,
} from "services/notes";
import isValidBody from "middlewares/isValidBody";
import { joiService } from "helpers";

const router = express.Router();

router.post("/", isValidBody(joiService.addNoteSchema), addNote);
router.get("/stats", getStatistics);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.patch("/:id", isValidBody(joiService.updateNoteSchema), updateNoteById);
router.delete("/:id", deleteNoteById);

export default router;
