const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/index.js');

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