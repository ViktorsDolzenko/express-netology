const express = require('express');
const bodyParser = require("body-parser");
const indexRouter = require('./routes');
const booksRouter = require('./routes/books');
const booksApiRouter = require('./routes/api/books-api');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME;
const PasswordDB = process.env.DB_PASSWORD;
const NameDB = process.env.DB_NAME;
const HostDb = process.env.DB_HOST;
async function start() {
    try {
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
