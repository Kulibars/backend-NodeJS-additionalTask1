const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log("Note was added!");
}

async function deleteNotes(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== String(id));
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log("note delete");
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  notes.forEach((note) => {
    console.log("title:", note.title, "id:", note.id);
  });
}

async function editNotes(editId, newTitle) {
  const notes = await getNotes();
  notes.forEach((note) => {
    if (note.id === String(editId)) {
      note.title = newTitle;
    }
  });
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log("note edit");
}

module.exports = {
  addNote,
  printNotes,
  deleteNotes,
  editNotes,
};
