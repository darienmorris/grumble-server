'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');
var bcrypt = require('bcrypt');
var DB = require(__dirname + '/../data/db');

var User = (function () {
	function User(userID) {
		_classCallCheck(this, User);

		this.userID = userID;
	}

	_createClass(User, null, [{
		key: 'register',
		value: function register(user, callback) {
			//TODO: throw an error
			if (!user.name || !user.username || !user.password) {}

			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(user.password, salt, function (err, hash) {
					DB.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [user.name, user.username, hash], function (err, result) {

						if (err) {
							callback(err);
						}

						callback(null);
					});
				});
			});
		}
	}, {
		key: 'validatePassword',
		value: function validatePassword(password, hash, callback) {
			bcrypt.compare(password, hash, function (err, res) {
				if (err) {
					console.log(err);
				}

				callback(err, res);
			});
		}
	}, {
		key: 'login',
		value: function login(user, callback) {
			//TODO: throw error
			if (!user.username || !user.password) {
				return "bad data";
			}

			DB.query('SELECT * FROM users WHERE username = $1', [user.username], function (err, result) {
				if (err) {
					console.log("there is an error", err);
				}

				if (result.rows.length == 0) {
					console.log("no results!");
					return;
				}

				User.validatePassword(user.password, result.rows[0].password, function (err, success) {
					if (err) {}

					//create a session token and send back user data
					callback(null, {
						user: result.rows[0],
						token: 'potato'
					});
				});
			});
		}
	}]);

	return User;
})();

module.exports = User;