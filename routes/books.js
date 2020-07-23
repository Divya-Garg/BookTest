module.exports = function(app) {
 
    var books = require('../controllers/books.js');
 
    // Retrieve all Books
    app.get('/api/books', books.getAll);
 
    // Retrieve a single Book by Id
    app.get('/api/books/:id', books.getById);
}