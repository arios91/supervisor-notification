const path = require('path');
const express = require('express')
const cors = require('cors');

const app = new express()
app.use(express.json())
app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

// API routes are stored in a seperate file to keep this clean
app.use('/api', require('./routes/main'))

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})