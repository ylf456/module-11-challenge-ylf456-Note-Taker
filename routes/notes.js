const notes = require('express').Router();
const { parse } = require('path');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
//const require_db = require('../db/db.json');
//const { readFile, writeFile } = require('fs/promises');

notes.get('/', (req, res) => {
    readFromFile("./db/db.json").then(
        (data) => res.json(JSON.parse(data))
    )
}
);

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        // if (activeNote.id) eventlistener use id for condition check
        const newNote = { title, text, id: uuid(), };
        readAndAppend(newNote, './db/db.json');
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    }
    else {
        res.json('error in adding new note');
    }
}
)
// check why the incoming id is not valid json
//body: JSON.stringify({deleteNote_id:id})
// splice method will alternate the original array
notes.delete('/:id', (req, res) => {
    console.log('req.body: ')
    console.log(req.body); // example: { deleteNote_id: 'sd41' }, already parsed
    const requestID = req.body.deleteNote_id;
    let parsedDb = require('../db/db.json');
    console.log(`requestID: ${requestID}`);
    console.log("ParsedDb(before splice): ")
    console.log(parsedDb);
    if (requestID) {
        let findID = (item) => item.id === requestID;
        console.log(`findID: ${findID}`);
        console.log(parsedDb.findIndex(findID));
        if (parsedDb.findIndex(findID) !== -1) {
            parsedDb.splice(parsedDb.findIndex(findID), 1);
            console.log("parsedDby(after splice): ");
            console.log(parsedDb);
            fs.writeFile('./db/db.json', JSON.stringify(parsedDb), (err) => err ? console.info(err) : console.info('successfully deleted one note'))
            res.json('successfully deleted note');
            parsedDb = require('../db/db.json');

        }
    } else { res.error('Error in deleting note') }

}
)


module.exports = notes;