'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');
var bcrypt = require('bcrypt');

var User = (function () {
	function User(userID) {
		_classCallCheck(this, User);

		this.userID = userID;
	}

	_createClass(User, null, [{
		key: 'register',
		value: function register(user) {
			//TODO: throw an error
			if (!user.name || !user.username || !user.password) {}

			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash('B4c0/\/', salt, function (err, hash) {
					//hash is the password
				});
			});
		}
	}, {
		key: 'validatePassword',
		value: function validatePassword(password, hash, callback) {}
	}, {
		key: 'login',
		value: function login(user) {

			//TODO: throw error
			if (!user.username || !user.password) {
				return "bad data";
			}

			// //TODO: do something better about this connection string
			var conString = "postgres://" + config.db.sql.user + ":" + config.db.sql.password + "@" + config.db.sql.server + "/" + config.db.sql.database + '?ssl=true';
			pg.connect(conString, function (err, client, done) {
				if (err) {}

				client.query('SELECT * FROM users WHERE username = $1', [user.username], function (err, result) {
					done();

					if (err) {
						console.log("there is an error", err);
					}

					if (reuslt.rows.length == 0) {}

					User.validatePassword(user.password, result.rows[0].password, function (err, result) {
						if (err) {}

						//create a session token and send back user data
						return "great success";
					});
				});
			});
		}
	}]);

	return User;
})();

module.exports = User;