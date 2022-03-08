const notes = require('express').Router();
const db = require('../db/db.json')
const fs = require('fs')

notes.get('/', (req, res) => {
    res.json(notes)
})


notes.post('/', (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text
    }


    let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
    let currentDb = JSON.parse(currentDbJSON)
    currentDb.push(newNote)

    console.log(currentDb);

    let fileToSend = JSON.stringify(currentDb)

    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");

})



module.exports = notes;