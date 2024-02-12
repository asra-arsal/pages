const express = require('express');

const APP = express.Router();
module.exports = APP;

APP.use('/get', require('./routes/app.get'));
APP.use('/edit', require('./routes/app.edit'));
APP.use('/create', require('./routes/app.create.js'));
APP.use('/delete', require('./routes/app.delete.js'));
