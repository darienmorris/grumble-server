"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require("lodash"),
    User = require(__dirname + "/user");

var Battle = (function () {
	function Battle(userIDs) {
		_classCallCheck(this, Battle);

		console.log("Battle Init!");
		this.userIDs = userIDs;

		// instantiate player class for each userID (this param should be an array of IDs)
		this.createPlayers();

		// A random player's turn is started
		// A timer exists that will force the player's turn to end if they do not do so voluntarily before the time expires.
		this.establishTurnOrder();

		// Create a socket connection with both players (once connection for each)
		// Should the player class handle this??
		this.connectPlayers();
	}

	_createClass(Battle, [{
		key: "createPlayers",
		value: function createPlayers() {
			this.players = [];

			this.userIDs.forEach((function (id) {
				console.log(id);

				// Todo: when Player class is created, instantiate player here
				// this.players.push(new Player(id));
				this.players.push(id);
			}).bind(this));
		}
	}, {
		key: "establishTurnOrder",
		value: function establishTurnOrder() {
			this.turn = {};
			this.turn.first = _.random(0, this.players.length - 1);
			this.turn.now = this.turn.first;
			console.log(this.turn);
		}
	}, {
		key: "connectPlayers",
		value: function connectPlayers() {
			this.players.forEach(function () {
				// listen for socket events for this player
				// should Battle have access to the server Hapi server instance created in index.js?
				// If yes, what is the best way to do this? Does socket.io and hapi need to be required in this file still?
				// Does Battle's constructor need to take the server as an arg?
			});
		}
	}]);

	return Battle;
})();

exports["default"] = Battle;
module.exports = exports["default"];