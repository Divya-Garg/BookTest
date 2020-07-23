module.exports = function(app) {
 
    var users = require('../controllers/users.js');
 
    // Retrieve all Users
    app.get('/api/users', users.getAll);
 
    // Retrieve a single User by Id
    app.get('/api/users/:id', users.getById);
}