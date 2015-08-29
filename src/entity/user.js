var _ = require('lodash');
var bcrypt = require('bcrypt');

class User {
	constructor(userID) {
		this.userID = userID;
	}

	static register(user) {
		//TODO: throw an error
		if(!user.name || !user.username || !user.password) {
		
		}

		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash('B4c0/\/', salt, function(err, hash) {
		    	//hash is the password
		    });
		});

	}

	static validatePassword(password, hash, callback) {

	}

	static login(user) {

		//TODO: throw error
		if(!user.username || !user.password) {
			return "bad data";
		}


		// //TODO: do something better about this connection string
		var conString = "postgres://"+config.db.sql.user+":"+config.db.sql.password+"@"+config.db.sql.server+"/"+config.db.sql.database+'?ssl=true';
        pg.connect(conString, function(err, client, done) {
            if(err) {
            }
            
            client.query('SELECT * FROM users WHERE username = $1', [user.username], function(err, result) {
                done();

                if(err) {
                    console.log("there is an error", err);
                }

                if(reuslt.rows.length == 0) {

                }

            	User.validatePassword(user.password, result.rows[0].password, function(err, result) {
            		if(err) {

            		}

            		//create a session token and send back user data
            		return "great success";
				});

            });
          
        });
	}

}

module.exports = User;