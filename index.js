const yargs = require("yargs");
const pkg = require("./package.json");
const {
  addNote,
  printNotes,
  deleteNotes,
  editNotes,
} = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  bulder: {
    title: {
      type: "string",
      describe: "note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  async handler({ id }) {
    deleteNotes(id);
  },
});

yargs.command({
  command: "edit",
  describe: "edit note by id",
  async handler({ id, title }) {
    editNotes(id, title);
  },
});

yargs.parse();
