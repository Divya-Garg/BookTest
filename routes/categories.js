module.exports = function(app) {

    var categories = require('../controllers/categories.js');

    // Retrieve all Categories
    app.get('/api/categories', categories.getTree);
}