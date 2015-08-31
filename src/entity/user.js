var _ = require('lodash');
var bcrypt = require('bcrypt');
var Boom = require('boom');

var DB = require(__dirname+'/../data/db');

class User {
	constructor(userID) {
		this.userID = userID;
	}

	static register(user, callback) {
		//TODO: throw an error
		if(!user.name || !user.username || !user.password) {
			return callback(Boom.badData("bad data for required parameters"));
		}

		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		    	DB.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)',[user.name, user.username, hash], function(err, result) {
					
					if(err) {
						return callback(Boom.wrap(err, 500));
		            }

		            callback(null);
				});
		    });
		});

	}

	static validatePassword(password, hash, callback) {
		bcrypt.compare(password, hash, function(err, res) {
			if(err) {
				return callback(Boom.wrap(err,500));
			}

			callback(err, res);
		});
	}

	static login(user, callback) {
		//TODO: throw error
		if(!user.username || !user.password) {
			return "bad data";
		}

		DB.query('SELECT * FROM users WHERE username = $1',[user.username],function(err, result) {
			if(err) {
				return callback(Boom.wrap(err, 500));
            }

            if(result.rows.length == 0) {
            	return callback(Boom.notFound());
            }

        	User.validatePassword(user.password, result.rows[0].password, function(err, success) {
        		if(err) {
        			return callback(Boom.wrap(err,500));
        		}

        		if(!success) {
        			return callback(Boom.unauthorized("invalid credentials"));
        		}
        		//create a session token and send back user data
        		callback(null, {
        			user: result.rows[0],
        			token: 'potato'
        		});
			});
		});
	}

}

module.exports = User;