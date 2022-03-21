const express = require('express');
const {Books} = require("./book");
const formData = require("express-form-data");


const registerResponse = { id: 1, mail: "test@mail.ru" };

const store = {
    books: []
};

const numbers = [1, 2, 3];

    numbers.map(el => {
    const newTodo = new Books(
        `book ${el}`,
        `desc book ${el}`,
        `author book ${el}`,
        `author book ${el}`,
        `author book ${el}` ,
        `author book ${el}`,
        );
    store.books.push(newTodo);
});

const app = express();
app.use(formData.parse());

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json(registerResponse)
});


app.get('/api/books', (req,res) => {
    const {books} = store;
    if(books) {
        res.status(201);
        res.json(books)
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

app.get('/api/books/:id', (req,res) => {
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

app.post('/api/books/', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Books(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req,res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
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
            fileName
        }
        res.status(201);
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
})

app.delete('/api/books/:id', (req, res) => {
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
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
