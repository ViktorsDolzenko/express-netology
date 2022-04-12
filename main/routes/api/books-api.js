const express = require('express');
const router = express.Router();
const {Books} = require("../../models/book");
const fileMiddleware = require("../../middleware/file");
const path = require("path");


const registerResponse = { id: 1, mail: "test@mail.ru" };

const store = {
    books: []
};

const numbers = [1, 2, 3];

numbers.map(el => {
    const newBook = new Books(
        `book ${el}`,
        `desc book ${el}`,
        `author book ${el}`,
        `author book ${el}`,
        `author book ${el}` ,
        `author book ${el}`,
        ''
    );
    store.books.push(newBook);
});

router.post('/login', (req, res) => {
    res.status(201);
    res.json(registerResponse)
});


router.get('/', (req,res) => {
    const {books} = store;
    if(books) {
        res.status(201);
        res.json(books)
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/:id', (req,res) => {
    const {books} = store;
    const {id} = req.params;
    const foundedBook = books.find((item) => item.id === id);
    if(foundedBook) {
        res.status(201);
        res.json(foundedBook)
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', fileMiddleware.single('bookFile'),(req, res) => {
    const {path} = req.file;
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook = path} = req.body;
    const newBook = new BooksApi(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id',  (req,res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        }
        res.status(201);
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/:id/download-book', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const book = books.find(el => el.id === id);
    const file = book.fileBook;
    const bookPath = path.join(__dirname, '../', file);
    res.download(bookPath,  err=>{
        if (err){
            res.status(404).json();
        }
        res.status(201);
    });
});
module.exports = router;

