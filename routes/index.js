const express = require('express');
const notes = require('./notesRoute')
const app = express();



app.use('/notes', notes)

module.exports = app;