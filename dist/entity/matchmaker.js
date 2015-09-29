'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');
var Boom = require('boom');
var Cache = require(__dirname + '/../data/cache');

var MatchMaker = (function () {
	function MatchMaker() {
		_classCallCheck(this, MatchMaker);

		this.cache = new Cache();
	}

	_createClass(MatchMaker, [{
		key: 'joinQuickMatch',
		value: function joinQuickMatch(userID) {
			this.addToQueue(userID, MatchMaker.QUICK_MATCH);
			this.lookForMatches(MatchMaker.QUICK_MATCH);
		}
	}, {
		key: 'addToQueue',
		value: function addToQueue(userID, gameType) {
			this.cache.hset(gameType, userID, JSON.Stringify({ userID: userID }));
		}
	}, {
		key: 'removeFromQueue',
		value: function removeFromQueue(userID, gameType) {}
	}, {
		key: 'getUsersInQueue',
		value: function getUsersInQueue(gameType) {}
	}, {
		key: 'lookForMatches',
		value: function lookForMatches(gameType) {
			var users = getUsersInQueue(gameType);
		}
	}]);

	return MatchMaker;
})();

MatchMaker.QUICK_MATCH = "quick-match";

module.exports = MatchMaker;