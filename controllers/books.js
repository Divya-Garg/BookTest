const Book = require('../models/book');

exports.getById = function(req, res) {
    let id = req.params.id;
    let clients = req.query.clients || false;
    let users = req.query.users || false;
    let country = req.query.country || false;
    let query = `select uuid, title, author, language from book where uuid='${id}'`;

    if (clients) {
        query = `select distinct l.client_id, b.uuid, b.title, b.author, b.language, l.country from book b inner join log l on b.uuid = l.book_id where b.uuid='${id}'`;
    } else if (users) {
        query = `select distinct l.user_id, b.uuid, b.title, b.author, b.language, l.country from book b inner join log l on b.uuid = l.book_id AND l.user_id != '' AND l.user_id is not null where b.uuid='${id}'`;
    } else if (country) {
        query = `select b.uuid, b.title, b.author, b.language, l.country, count(l.country) from book b left join log l on b.uuid = l.book_id where book_id='${id}' group by b.uuid, b.title, b.author, b.language, l.country`;
    }

    global.db.query(query)
        .then(data => {
            var result = {
                uuid: data[0][0].uuid,
                title: data[0][0].title,
                author: data[0][0].author,
                language: data[0][0].language
            };
            let keys = ['country'];
            if (clients) {
                keys.push('client_id');
            } else if (users) {
                keys.push('user_id');
            } else if (country) {
                keys.push('count');
            }
            if (clients || users || country) {
                result.readBy = [];
                for(var i in data[0]) {
                    let temp = {};
                    for(var j in keys) {
                        temp[keys[j]] = data[0][i][keys[j]];
                    }
                    result.readBy.push(temp);
                }
            }
        	if (data && data != null) {
            	res.send(result);
        	} else {
        		res.status(404).send({ message: 'No book found!'});
        	}
        })
        .catch(err => {
            res.status(500).send({ error: 'Internal server error' } );
        });
};

exports.getAll = function(req, res) {
    let offset = req.query.offset || 0;
    let limit = req.query.limit;
    limit = limit && limit <= 100 ? limit : 10;
    Book.findAll({
	    	attributes: ['uuid', 'title', 'author', 'language'],
	    	offset,
	    	limit
	    })
        .then(data => {
        	if (data && data != null && data.length) {
            	res.send({count: data.length, data });
        	} else {
        		res.status(404).send({ message: 'No books found!'});
        	}
        })
        .catch(err => {
            res.status(500).send({ error: 'Internal server error' } );
        });
};
