var pg = require('pg');

function DB(options) {
	var conString = "postgres://"+config.db.sql.user+":"+config.db.sql.password+"@"+config.db.sql.server+"/"+config.db.sql.database;
	this.connect(conString);
}

DB.prototype.connect = function(conString) {
	pg.connect(conString, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		
		client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		//call `done()` to release the client back to the pool 
		done();

		if(err) {
		  return console.error('error running query', err);
		}
		console.log(result.rows[0].number);
		//output: 1 
		});
	});
}