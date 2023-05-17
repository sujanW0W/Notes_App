const express = require("express");
const route = express();

const {
    getNote,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/notes");

route.get("/", getNote);

route.get("/:id", getNoteById);

route.post("/", createNote);

route.patch("/:id", updateNote);

route.delete("/:id", deleteNote);

module.exports = route;
