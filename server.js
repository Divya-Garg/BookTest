const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConn = require('./lib/db');

process.on('uncaughtException', function(err) { 
  
    // Handle the error safely 
    console.log(`Unhandled exception: ${err}`); 
});

try {
	let rawData = fs.readFileSync('./config.json', {encoding: 'utf8', flag: 'r'});
	global.configuration = JSON.parse(rawData);
} catch (err) {
	console.log("Unable to read configuration file. Error: " . err);
	return process.exit(1);
}

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging all incoming requests on console (you can use alternative logging tools)
app.use(function(req, res, next) {
    console.log(`Received request: ${req.method}:${req.originalUrl}`);
    next();
});

global.configuration.port = global.configuration.port || 3000;

dbConn()
	.then(db => {
		global.db = db;

		try {
			require('./routes/books.js')(app);
			require('./routes/users.js')(app);
			require('./routes/categories.js')(app);
			
			// Start server
			app.listen(global.configuration.port, () =>
			  console.log(`BookTest server app is listening on port ${global.configuration.port}!`)
			);
		} catch (e) {
			console.error(`Unhandled exception at server ${e}`);
		}
	})
	.catch(err => {
		console.log('Unable to connect to database! Error: ' . err);
		return process.exit(1);
	});