var _ = require('lodash');
var bcrypt = require('bcrypt');
var DB = require(__dirname+'/../data/db');

class User {
	constructor(userID) {
		this.userID = userID;
	}

	static register(user) {
		//TODO: remove test data
		user = {name: 'Darien Morris', username: 'darien.morris', password:'test'};
		
		//TODO: throw an error
		if(!user.name || !user.username || !user.password) {
		
		}

		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		    	DB.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)',[user.name, user.username, hash], function(err, result) {
					
					if(err) {
		                console.log("there is an error", err);
		            }
				});
		    });
		});

	}

	static validatePassword(password, hash, callback) {
		console.log("validating "+password+" against "+hash);
		bcrypt.compare(password, hash, function(err, res) {
			if(err) {
				console.log(err);
			}
			console.log(res);
		});
	}

	static login(user) {
		console.log(user);
		
		//TODO: throw error
		if(!user.username || !user.password) {
			return "bad data";
		}

		DB.query('SELECT * FROM users WHERE username = $1',[user.username],function(err, result) {
			if(err) {
                console.log("there is an error", err);
            }

            if(result.rows.length == 0) {
            	console.log("no results!");
            	return;
            }

        	User.validatePassword(user.password, result.rows[0].password, function(err, result) {
        		if(err) {

        		}

        		//create a session token and send back user data
        		return "great success";
			});
		});
	}

}

module.exports = User;