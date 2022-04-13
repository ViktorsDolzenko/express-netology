const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {Books} = require('../models/book');

const store = {
    books: []
};

const numbers = [1, 2, 3];

const serviceCounter = express();

numbers.map(el => {
    const newBook = new Books(
        `book ${el}`,
        `desc book ${el}`,
        `author book ${el}`,
        `favorite book ${el}`,
        `author book ${el}` ,
        `author book ${el}`,
        ''
    );
    store.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = store;
    res.render('books/index', {
        title: "Books",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "book | create",
        book: {},
    });
});

router.get('/:id',  async (req,res) => {
    const {books} = store;
    const {id} = req.params;
    const foundedBook = books.find((item) => item.id === id);
    if(foundedBook) {
        res.status(201);
            const requestOptions = {
                method: 'POST',
            };
           const rawResponse = await fetch(`http://counter:5432/counter/${id}/incr`, requestOptions);
           const content = await rawResponse.json();
            res.render('books/view', {
                title: foundedBook.title,
                book: foundedBook,
                count: content
            })
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/create',(req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Books(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.redirect('/books')
});

router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Books | update",
            book: books[idx],
        });
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/update/:id',  (req,res) => {
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
        res.redirect('/books')
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404);
        console.log('animal')
        res.json("book | not found");
    }
});

module.exports = router;
