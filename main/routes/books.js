const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
    const books = await Book.find();
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
    const {id} = req.params;
    const book = await Book.findById(id)
    if(book) {
        res.status(201);
            res.render('books/view', {
                title: book.title,
                book: book,
            })
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/create',async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName});

    try {
        await newBook.save();
    } catch (e) {
        console.error(e);
    }

    res.status(201);
    res.redirect('/books')
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id)

    if (book) {
        res.render("books/update", {
            title: "Books | update",
            book: book,
        });
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/update/:id',  async (req,res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params;
    try {
        await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook});
        res.status(201);
        res.redirect('/books')
    } catch (e) {
        console.error(e)
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id})
        res.status(200);
        res.redirect('/books')
    } catch (e) {
        console.error(e);
        res.status(404);
    }
});

module.exports = router;
