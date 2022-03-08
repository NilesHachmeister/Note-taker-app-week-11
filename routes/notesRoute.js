const notes = require('express').Router();
const fs = require('fs')
const uuid = require('../helpers/uuid')


// declaring our database file. reading it, and turning it into javascript
let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
let currentDb = JSON.parse(currentDbJSON)

// on get request the user is returned with the javascript version of our database file
notes.get('/', (req, res) => {
    res.json(currentDb)
})

// on a post request the request.body is turned into a newNote variable, added to the database, and then the user is responded with their new note
notes.post('/', (req, res) => {

    // declaring our database file. reading it, and turning it into javascript
    const { title, text } = req.body;

    // ccreating the newNote variable with the info from the body as well as a unique id
    const newNote = {
        title,
        text,
        id: uuid()
    }

    // pushing the new note and saving the information as a string
    currentDb.push(newNote)
    const fileToSend = JSON.stringify(currentDb)

    // rewriting the json file to include the new note
    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");

    // responding to the user with the newNote voriable
    res.json(fileToSend)
})

// on a delete request the note the user wants to delete is removed from the file
notes.delete('/:id', (req, res) => {
    res.send("Deleted that note")

    // declaring the variable that is the id that the user clicked on
    const deleteID = req.params.id

    // looping through each object in the array. If the id matches, that object is then removed from the array
    for (let index = 0; index < currentDb.length; index++) {
        const element = currentDb[index].id;
        if (element === deleteID) {
            currentDb.splice(index, 1)
        }
    }

    // turning the array of objects into string format and rewriting it without the removed item.
    const fileToSend = JSON.stringify(currentDb)
    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");
})


module.exports = notes;