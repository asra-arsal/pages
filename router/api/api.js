const express = require('express');

const API = express.Router();
module.exports = API;

API.use('/v1', require('./v1/v1'));
