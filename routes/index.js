const express = require('express');
const notes = require('./notesRoute')
const app = express();


// creating the route for /api/notes
app.use('/notes', notes)

module.exports = app;