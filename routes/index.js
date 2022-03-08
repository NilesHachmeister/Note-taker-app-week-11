const express = require('express');
const notes = require('./notesRoute')
const app = express();

app.use(express.static('public'));

app.use('/notes', notes)

module.exports = app;