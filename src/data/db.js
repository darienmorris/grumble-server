var pg = require('pg');
var config = require(__dirname + '/../../config/development');

class DB {
	static query(query, values, callback) {
		var conString = "postgres://"+config.db.sql.user+":"+config.db.sql.password+"@"+config.db.sql.server+"/"+config.db.sql.database+'?ssl=true';

		pg.connect(conString, function(err, client, done) {
			if(err) {
				console.log(err);
			}

			client.query(query, values, function(err, result) {
			  done();
			  callback(err, result);
			})
		});
	}
}

module.exports = DB;