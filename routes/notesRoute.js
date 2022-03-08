const notes = require('express').Router();
const fs = require('fs')
const uuid = require('../helpers/uuid')

// declaring our database file. reading it, and turning it into javascript
let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
let db = JSON.parse(currentDbJSON)

// on get request the user is returned with the javascript version of our database file
notes.get('/', (req, res) => {
    res.json(db)
})

// on a post request the request.body is turned into a newNote variable, added to the database, and then the user is responded with their new note
notes.post('/', (req, res) => {

    // descructuring the request body
    const { title, text } = req.body;

    // ccreating the newNote variable with the info from the body as well as a unique id
    const newNote = {
        title,
        text,
        id: uuid()
    }

    // pushing the new note and saving the information as a string
    db.push(newNote)
    const dbToSend = JSON.stringify(db)

    // rewriting the json file to include the new note
    fs.writeFileSync('./db/db.json', dbToSend, "utf-8");

    // responding to the user with the newNote voriable
    res.json(newNote)
})

// on a delete request the note the user wants to delete is removed from the file
notes.delete('/:id', (req, res) => {

    // declaring the variable that is the id that the user clicked on
    const deleteID = req.params.id

    // looping through each object in the array. If the id matches, that object is then removed from the array
    for (let index = 0; index < db.length; index++) {
        const element = db[index].id;
        if (element === deleteID) {
            db.splice(index, 1)
        }
    }

    // turning the array of objects into string format and rewriting it without the removed item.
    const dbToSend = JSON.stringify(db)
    fs.writeFileSync('./db/db.json', dbToSend, "utf-8");
})



module.exports = notes;