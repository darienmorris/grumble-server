"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require("lodash"),
    User = require(__dirname + "/user");

var Battle = (function () {
	function Battle(io, userIDs) {
		_classCallCheck(this, Battle);

		console.log("Battle Init!");
		this.io = io;
		this.userIDs = userIDs;
		this.battleStarted = false;

		// instantiate player class for each userID (this param should be an array of IDs)
		this.createPlayers();

		// A random player's turn is started
		// A timer exists that will force the player's turn to end if they do not do so voluntarily before the time expires.
		// this.establishTurnOrder();

		// Create a socket connection with both players (once connection for each)
		// Should the player class handle this??
		this.connectPlayers();

		console.log(" ");
	}

	_createClass(Battle, [{
		key: "createPlayers",
		value: function createPlayers() {
			this.players = [];

			this.userIDs.forEach((function (id) {
				console.log(id);

				// Todo: when Player class is created, instantiate player here
				// this.players.push(new Player(id));
				// this.players.push(id);
			}).bind(this));
		}
	}, {
		key: "establishTurnOrder",
		value: function establishTurnOrder() {
			if (!this.battleStarted) {
				console.log("establish turn order");
				this.turn = {};
				this.turn.first = _.random(0, this.players.length - 1);
				this.turn.now = this.turn.first;
				this.battleStarted = true;
				console.log(this.turn);
			}
		}
	}, {
		key: "connectPlayers",
		value: function connectPlayers() {
			console.log("connect players");
			var self = this;
			// For now players is an array of id strings.
			// TODO: create player class to use instead.

			/*this.players.forEach(function(player){
   	// listen for socket events for this player
   	// should Battle have access to the server Hapi server instance created in index.js?
   		// If yes, what is the best way to do this? Does socket.io and hapi need to be required in this file still?
   		// Does Battle's constructor need to take the server as an arg?
   			
   });*/

			this.io.on("connection", function (socket) {
				socket.playerID;
				var playerID;

				// There can only be two players connected in a game,
				// so kill the socket and return the callback if there is more.
				// We will probably handle this another way though.
				if (self.players.length >= 2) {
					console.log("battle is already full.");
					socket.disconnect();
					return;
				}

				self.onNewPlayerId(socket);
				self.onSendMessage(socket);
				self.onDisconnect(socket);

				/*socket.on("player id", function(id){
    	playerID = id;
    	self.players.push(id);
    	if(self.players.length == 2){
    		self.establishTurnOrder();
    	}
    	self.io.emit("player count", self.players.length);
    });*/

				/*socket.on("send message", function(data) {
    	if(playerID == self.turn.now)
    	let message = data.id + ": " + data.message;
    	self.io.emit("send message", message);
    });*/

				/*socket.on('disconnect', function(){				
    	let i = self.players.indexOf(playerID);
    	self.players.splice(i, 1);
    	console.log('user disconnected');
    	socket.disconnect();
    });*/
			});
		}
	}, {
		key: "onNewPlayerId",
		value: function onNewPlayerId(socket) {
			var self = this;
			socket.on("player id", function (id) {
				socket.playerID = id;
				self.players.push(id);
				if (self.players.length == 2) {
					self.establishTurnOrder();
				}
				self.io.emit("player count", self.players.length);
			});
		}
	}, {
		key: "onSendMessage",
		value: function onSendMessage(socket) {
			var self = this;
			socket.on("send message", function (data) {
				//if(socket.playerID == self.turn.now)
				var message = data.id + ": " + data.message;
				self.io.emit("send message", message);
			});
		}
	}, {
		key: "onDisconnect",
		value: function onDisconnect(socket) {
			var self = this;
			socket.on('disconnect', function () {
				var i = self.players.indexOf(socket.playerID);
				self.players.splice(i, 1);
				console.log('user disconnected');
				socket.disconnect();
			});
		}
	}]);

	return Battle;
})();

exports["default"] = Battle;
module.exports = exports["default"];