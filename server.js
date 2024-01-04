const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);  //routing:  notes path will be  ~/api/notes/

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`local deployment: Example app listening at http://localhost:${PORT}`)
);