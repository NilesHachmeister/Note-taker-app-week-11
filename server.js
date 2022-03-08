const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

// using my middlewear to allow better transfer of data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// declaring the public folder as static
app.use(express.static('public'));

// using the index.html file in routes as a route
app.use('/api', api);

// sending the notes file when the notes button is clicked on
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// sending the public/index.html file when accessing the base of server
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// listening to the port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

