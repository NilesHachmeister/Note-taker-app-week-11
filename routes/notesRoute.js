const notes = require('express').Router();
const db = require('../db/db.json')
const fs = require('fs')
const uuid = require('../helpers/uuid')

notes.get('/', (req, res) => {
    res.json(db)
})


notes.post('/', (req, res) => {



    let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
    let currentDb = JSON.parse(currentDbJSON)

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid()
    }

    currentDb.push(newNote)

    console.log(currentDb);

    const fileToSend = JSON.stringify(currentDb)

    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");




    //     THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
    // WHEN I click on an existing note in the list in the left-hand column
    // THEN that note appears in the right-hand column
    // WHEN I click on the Write icon in the navigation at the top of the page
    // THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
    //     res.json(db)

})


notes.delete('/:id', (req, res) => {
    res.send('Got a DELETE request at /user')

    const deleteID = req.params.id

    let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
    let currentDb = JSON.parse(currentDbJSON)


    for (let index = 0; index < currentDb.length; index++) {
        const element = currentDb[index].id;

        console.log(element);
        console.log(deleteID);

        if (element === deleteID) {
            currentDb.splice(index, 1)
        }

    }


    const fileToSend = JSON.stringify(currentDb)

    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");



})



module.exports = notes;