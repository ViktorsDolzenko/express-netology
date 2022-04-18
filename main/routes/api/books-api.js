const express = require('express');
const router = express.Router();
const Book = require("../../models/book");
const fileMiddleware = require("../../middleware/file");
const path = require("path");


const registerResponse = { id: 1, mail: "test@mail.ru" };


router.post('/login', (req, res) => {
    res.status(201);
    res.json(registerResponse)
});


router.get('/', async (req,res) => {
    const books = await Book.find()
    if(books) {
        res.status(201);
        res.json(books)
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const book = await Book.findById(id)
    if(book) {
        res.status(201);
        res.json(book)
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', fileMiddleware.single('bookFile'), async (req, res) => {
    const {path} = req.file;
    const {title, description, authors, favorite, fileCover, fileName, fileBook = path} = req.body;
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName, fileBook})
   try {
        newBook.save();
        res.status(200);
        res.json(newBook);
   } catch (e) {
        console.error(e)
   }
});

router.put('/:id',  async (req,res) => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    try {
        await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook});
        res.status(200);
    } catch (e) {
        console.error(e)
        res.status(404);
        res.json("book | not found");
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id})
        res.status(200);
    } catch (e) {
        console.error(e);
    }
});

// router.get('/:id/download-book', (req, res) => {
//     const {books} = store;
//     const {id} = req.params;
//     const book = books.find(el => el.id === id);
//     const file = book.fileBook;
//     const bookPath = path.join(__dirname, '../', file);
//     res.download(bookPath,  err=>{
//         if (err){
//             res.status(404).json();
//         }
//         res.status(201);
//     });
// });
module.exports = router;

