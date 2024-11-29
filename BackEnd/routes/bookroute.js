const express = require('express');
const bookcontroller = require('../controller/bookcontroller');

const router = express.Router();

// Route to fetch all books
router.get('/', bookcontroller.getBooks);
router.post('/books',bookcontroller.addBook);
router.put('/books/:id',bookcontroller.updateBook);
router.delete('/books/:id', bookcontroller.deleteBook);

module.exports = router;
