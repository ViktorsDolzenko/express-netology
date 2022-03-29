const express = require('express');
const bodyParser = require("body-parser");
const booksRouter = require('./routes/books');

const app = express();
app.use(bodyParser());
app.use('/public', express.static(__dirname+"/public"));
app.use('/api/books', booksRouter);

app.listen(3000);
