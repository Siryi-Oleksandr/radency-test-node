import fs from "fs";
import path from "path";
import { INote } from "types/INote";

const notesPath = path.join(process.cwd(), "src", "db", "notes.json");

export class NotesService {
  private notes: INote[];

  constructor() {
    this.notes = this.readNotesFromJson();
  }

  private readNotesFromJson(): INote[] {
    try {
      const data = fs.readFileSync(notesPath, "utf-8");
      return JSON.parse(data) as INote[];
    } catch (error) {
      console.error("Error reading notes from JSON:", error);
      return [];
    }
  }

  private saveNotesToJson(): void {
    try {
      fs.writeFileSync(notesPath, JSON.stringify(this.notes, null, 2), "utf-8");
    } catch (error) {
      throw new Error("Failed to save notes to JSON file");
    }
  }

  private countNotesByCategory(notes: INote[]) {
    const initialCount = {
      Task: { archivedTrue: 0, archivedFalse: 0 },
      Idea: { archivedTrue: 0, archivedFalse: 0 },
      "Random Thought": { archivedTrue: 0, archivedFalse: 0 },
    };

    return notes.reduce((acc, note) => {
      const category = note.category;
      const isArchived = note.archived;

      if (category in acc) {
        if (isArchived) {
          acc[category].archivedTrue++;
        } else {
          acc[category].archivedFalse++;
        }
      }

      return acc;
    }, initialCount);
  }

  selectAllNotes(): INote[] {
    return this.notes;
  }

  selectNoteById(id: string): INote | undefined {
    return this.notes.find((note) => note.id === id);
  }

  createNote(note: INote): boolean {
    this.notes.push(note);
    this.saveNotesToJson();
    return true;
  }

  updateNoteById(id: string, updatedNote: INote): boolean {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      return false;
    }
    this.notes[index] = { ...updatedNote, id };
    this.saveNotesToJson();
    return true;
  }

  deleteNoteById(id: string): boolean {
    const note = this.selectNoteById(id);
    if (!note) {
      return false;
    }
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotesToJson();
    return true;
  }

  getCountNotes() {
    return this.countNotesByCategory(this.notes);
  }
}
