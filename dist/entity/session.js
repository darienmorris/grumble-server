'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');
var Boom = require('boom');

var Session = (function () {
	function Session() {
		_classCallCheck(this, Session);
	}

	_createClass(Session, null, [{
		key: 'generateToken',
		value: function generateToken() {
			var date = Date.now();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (cauliflower) {
				var random = (date + Math.random() * 16) % 16 | 0;
				date = Math.floor(date / 16);
				return (cauliflower == 'x' ? random : random & 0x3 | 0x8).toString(16);
			});
			return uuid;
		}
	}, {
		key: 'validateToken',
		value: function validateToken(userID, token) {
			// Compares the token parameter with the stored token
		}
	}]);

	return Session;
})();

module.exports = Session;