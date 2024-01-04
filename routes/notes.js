const notes = require('express').Router();
const { parse } = require('path');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');
const { json } = require('express');
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
    console.log(`requestID: ${requestID}`);
    fs.readFile('./db/db.json',(err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const jsonData = JSON.parse(data);
        console.log("jsonData(before splice): ")
        console.log(jsonData);
        
        let findID = (item) => item.id === requestID;
        console.log(`findID: ${findID}`);
        console.log(jsonData.findIndex(findID));
        
        if (jsonData.findIndex(findID) !== -1) {
            jsonData.splice(jsonData.findIndex(findID), 1);
            console.log("jsonData(after splice): ");
            console.log(jsonData);
            fs.writeFile('./db/db.json', JSON.stringify(jsonData), (err) => err ? console.info(err) : console.info('successfully deleted one note'))
           // if (parsedDb.length !== 0 ) {res.json(parsedDb)};
           
        }
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    })
}
)

module.exports = notes;