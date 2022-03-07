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


    let currentDbJSON = fs.readFileSync(db, "utf-8");
    let currentDb = JSON.parse(currentDbJSON)
    currentDb.push(newNote)

    let fileToSend = JSON.stringify(currentDb)

    fs.appendFile('./db/db.json', fileToSend, (err) =>
        err
            ? console.error(err)
            : console.log(
                `the note has been added`
            ));


    // fs.writeFileSync("users.json",usersjson,"utf-8");

})



module.exports = notes;