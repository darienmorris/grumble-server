'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var pg = require('pg');
var config = require(__dirname + '/../../config/development');

var DB = (function () {
	function DB() {
		_classCallCheck(this, DB);
	}

	_createClass(DB, null, [{
		key: 'query',
		value: function query(_query, values, callback) {
			var conString = "postgres://" + config.db.sql.user + ":" + config.db.sql.password + "@" + config.db.sql.server + "/" + config.db.sql.database + '?ssl=true';

			pg.connect(conString, function (err, client, done) {
				if (err) {
					console.log(err);
				}

				client.query(_query, values, function (err, result) {
					done();
					callback(err, result);
				});
			});
		}
	}]);

	return DB;
})();

module.exports = DB;