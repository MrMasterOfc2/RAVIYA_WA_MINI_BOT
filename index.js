const express = require('express');
const path = require('path');  // Add this
const app = express();
const __path = path.join(process.cwd(), '/');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

let code = require('./pair');  // Ensure pair.js exists

require('events').EventEmitter.defaultMaxListeners = 500;

app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(path.join(__path, 'pair.html'));
});
app.use('/', async (req, res, next) => {
    res.sendFile(path.join(__path, 'main.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
