const User = require('../models/user');

exports.getById = function(req, res) {
    let id = req.params.id;
    User.findOne({
            where: {
                id
            }
        })
        .then(data => {
            if (data && data != null && data.dataValues) {
                let result = {
                    id: data.dataValues.id,
                    gender: data.dataValues.usergender == '2' ? 'Female' : (data.dataValues.usergender == '1' ? 'Male' : 'Unknown' ),
                    age: data.dataValues.age,
                    createdAt: data.dataValues.createdat,
                    updatedAt: data.dataValues.updatedat
                };
                res.send(result);
            } else {
                res.status(404).send({ message: 'No user found!'});
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Internal server error' } );
        });
};

exports.getAll = function(req, res) {
    let filterByGender = req.query.gender;
    let sortByCreated = req.query.created;
    let sortByUpdated = req.query.updated;
    let where = {};
    let order = [];

    if (filterByGender || filterByGender == 0) {
        where.usergender = filterByGender;
    }
    if (sortByCreated && sortByCreated.toUpperCase() == 'ASC') {
        order.push(['createdat', 'ASC']);
    }
    if (sortByCreated && sortByCreated.toUpperCase() == 'DESC') {
        order.push(['createdat', 'DESC']);
    }
    if (sortByUpdated && sortByUpdated.toUpperCase() == 'ASC') {
        order.push(['updatedat', 'ASC']);
    }
    if (sortByUpdated && sortByUpdated.toUpperCase() == 'DESC') {
        order.push(['updatedat', 'DESC']);
    }

    let offset = req.query.offset || 0;
    let limit = req.query.limit;
    limit = limit && limit <= 100 ? limit : 10;
    User.findAll({
            where,
            order,
            offset,
            limit
        })
        .then(data => {
            if (data && data != null && data.length) {
                res.send({count: data.length, data });
            } else {
                res.status(404).send({ message: 'No users found!'});
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Internal server error' } );
        });
};
