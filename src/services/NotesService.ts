import fs from "fs";
// import { nanoid } from "nanoid";
import path from "path";
import { INote } from "types/INote";

const notesPath = path.join(process.cwd(), "src", "db", "notes.json");
console.log(notesPath);

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
}

// const getNotesService = async () => {
//   const notes = await fs.readFile(notesPath);
//   return JSON.parse(notes);
// };

// const updateContacts = (contacts) =>
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const getContactByIdService = async (contactId) => {
//   const contacts = await listContactsService();
//   const contact = contacts.find((el) => el.id === contactId);
//   return contact || null;
// };

// const removeContactService = async (contactId) => {
//   const contacts = await listContactsService();
//   const contactIdx = contacts.findIndex((el) => el.id === contactId);
//   if (contactIdx === -1) {
//     return null;
//   }
//   const [deletedContact] = contacts.splice(contactIdx, 1);
//   await updateContacts(contacts);
//   return deletedContact;
// };

// const addContactService = async (body) => {
//   const contacts = await listContactsService();
//   const contact = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(contact);
//   await updateContacts(contacts);
//   return contact;
// };

// const updateContactService = async (contactId, body) => {
//   const contacts = await listContactsService();
//   const contactIdx = contacts.findIndex((el) => el.id === contactId);
//   if (contactIdx === -1) {
//     return null;
//   }
//   const updatedContact = {
//     id: contactId,
//     ...body,
//   };
//   contacts.splice(contactIdx, 1, updatedContact);
//   await updateContacts(contacts);
//   return updatedContact;
// };
