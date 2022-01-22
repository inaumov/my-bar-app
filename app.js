'use strict';

const express = require('express');
const app = express();
const router = express.Router();

// Constants
const path = __dirname + '/public/';
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Route to handle all angular requests
app.get('/', (req, res) => {
    res.sendFile(path + 'index.html'); // load our public/index.html file
});

app.use(express.static(path));
app.use('/', router);

app.listen(PORT, function () {
    console.log(`Running on http://${HOST}:${PORT}`);
});