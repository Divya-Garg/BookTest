const Category = require('../models/category');

function createTree(arr, parent) {
    var out = []
    for(var i in arr) {
        if(arr[i].parent_id == parent) {
            var childCategories = createTree(arr, arr[i].id)

            if(childCategories.length) {
                arr[i].childCategories = childCategories
            }
            let obj = JSON.parse(JSON.stringify(arr[i]));1
            if (arr[i].childCategories) {
                obj.childCategories = JSON.parse(JSON.stringify(arr[i].childCategories));
            }
            out.push(obj);
        }
    }
    return out
}

exports.getTree = function(req, res) {
    Category.findAll({
            order: [
                ['parent_id', 'ASC NULLS FIRST']
            ]
        })
        .then(data => {
            if (data && data != null && data.length) {
                var cats = createTree(data, null);
                res.send(cats);
            } else {
                res.status(404).send({ message: 'No categories found!'});
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Internal server error' } );
        });
};
