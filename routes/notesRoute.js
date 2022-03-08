const notes = require('express').Router();
const fs = require('fs')
const uuid = require('../helpers/uuid')


// read? note on get

// send new note so that it updates when post or delete



//     THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes


let currentDbJSON = fs.readFileSync('./db/db.json', "utf-8");
let db = JSON.parse(currentDbJSON)


notes.get('/', (req, res) => {



    res.json(db)

})


notes.post('/', (req, res) => {




    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid()
    }

    db.push(newNote)
    const dbToSend = JSON.stringify(db)

    fs.writeFileSync('./db/db.json', dbToSend, "utf-8");



    res.json(fileToSend)



})


notes.delete('/:id', (req, res) => {
    res.send('Got a DELETE request at /user')

    const deleteID = req.params.id



    for (let index = 0; index < db.length; index++) {
        const element = db[index].id;

        if (element === deleteID) {
            db.splice(index, 1)
        }

    }


    const dbToSend = JSON.stringify(db)

    fs.writeFileSync('./db/db.json', dbToSend, "utf-8");



})



module.exports = notes;