const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/', bookController.getBooks); 
router.post('/add_book',  bookController.addBook);
router.put('/update_book/:id', bookController.updateBooks)
router.delete('/delete/:id',  bookController.removeBook);

module.exports = router;
