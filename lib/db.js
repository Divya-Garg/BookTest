const { Sequelize } = require('sequelize');

function connectDatabase() {
	return new Promise((resolve, reject) => {
		const sequelize = new Sequelize(global.configuration.database.name,
										global.configuration.database.username,
										global.configuration.database.password, {
		  									host: global.configuration.database.host,
		  									dialect: global.configuration.database.dialect
										});
		sequelize.authenticate()
			.then(() => {
				return resolve(sequelize);
			})
			.catch(err => {
				return reject(err);
			});
	});
};

module.exports = connectDatabase;