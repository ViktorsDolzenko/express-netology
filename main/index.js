const express = require('express');
const bodyParser = require("body-parser");
const indexRouter = require('./routes');
const booksRouter = require('./routes/books');
const booksApiRouter = require('./routes/api/books-api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});
