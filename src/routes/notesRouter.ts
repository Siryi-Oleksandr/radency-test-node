import express from "express";
import { getNotes } from "repositories/notes";

const router = express.Router();

router.get("/", getNotes);

export default router;
