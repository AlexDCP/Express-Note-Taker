const app = require('express').Router();
// this is a node module that generates an id for the notes to be able to delete them.
const { v4: uuidv4 } = require('uuid');
//imported helpers.
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
app.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific note
app.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes, except the one with id selected.
      const result = json.filter((note) => note.id !== noteId);

      // adds new array of notes back
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});

// POST route to add the notes to the page.
app.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = app;