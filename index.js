const { response, request } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

const Notes = require("./models/notes_model");
const User = require("./models/users_model");

app.get("/", (request, response) => {
  response.send("<h1>Hola Mundo!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(Notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = Notes.find((note) => note.id === id);

  if (note) {
    return response.json(note);
  } else {
    response.status(202).end("id inexistente");
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  Notes = Notes.filter((note) => note.id !== id);

  response.status(204).end("Se elimino correctamente");
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note.content) {
    return response.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const ids = Notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date(),
    import: note.important || false,
  };

  notes = Notes.concat(newNote);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
