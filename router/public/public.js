const express = require('express');

const PUBLIC = express.Router();
module.exports = PUBLIC;

PUBLIC.use('/', require('./home/home'));
