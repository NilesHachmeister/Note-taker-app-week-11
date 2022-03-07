const notes = require('express').Router();
const db = require('../db/db.json')


notes.get('/', (req, res) => {
    res.json(notes)
})





module.exports = notes;