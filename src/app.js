const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');

app.use(bodyParser.json());
require('dotenv').config();
app.use(express.static("public"));
app.use(require('./routes'));

module.exports = app;