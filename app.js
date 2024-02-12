require('dotenv').config();

const njk = require('nunjucks');
const express = require('express');
const bodyParser = require('body-parser');

const seedDB = require('./data/seedDB');

const app = express();
const PORT = process.env.UNIFIED_PORT || 49500;
const HOST = process.env.UNIFIED_HOST || '127.0.0.1';

seedDB();

njk.configure('./views', {
    express: app,
    autoescape: true,
});
app.set('view engine', 'html');

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./router/router'));

app.listen(PORT, () => {
    console.log(`Unified Engine is listening at: http://${HOST}:${PORT}`);
});
