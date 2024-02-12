const express = require('express');

const V1 = express.Router();
module.exports = V1;

V1.use('/app', require('./app/app'));
