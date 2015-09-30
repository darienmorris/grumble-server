"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require("lodash"),
    User = require(__dirname + "/user");

var Battle = (function () {
	function Battle(userIDs) {
		_classCallCheck(this, Battle);

		this.userIDs = userIDs;

		// instantiate player class for each userID (this param should be an array of IDs)
		this.createPlayers();

		// Create a socket connection with both players (once connection for each)

		// A random player's turn is started
		// A timer exists that will force the player's turn to end if they do not do so voluntarily before the time expires.
	}

	/*
 
 Sample socket
 
 var io = require('socket.io')(server.select('api').listener);
 
 io.on('connection', function(socket) {
 	console.log("connection!");
 	socket.emit('A user connected');
 
 	socket.on('typing', function(message) {
 		io.emit('typing', message);
 	});
 
 });
 
 */

	_createClass(Battle, [{
		key: "createPlayers",
		value: function createPlayers() {
			this.players = [];

			this.userIDs.forEach(function (id) {
				// this.players.push(new Player(id));
			});
		}
	}]);

	return Battle;
})();