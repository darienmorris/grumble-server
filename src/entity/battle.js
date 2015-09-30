var _ 		= require("lodash"),
	User 	= require(__dirname + "/user");


class Battle {

	constructor(userIDs) {
		this.userIDs = userIDs;
		
		// instantiate player class for each userID (this param should be an array of IDs)
		this.createPlayers();

		// Create a socket connection with both players (once connection for each)

		// A random player's turn is started
			// A timer exists that will force the player's turn to end if they do not do so voluntarily before the time expires.
	}

	createPlayers() {
		this.players = [];

		this.userIDs.forEach(function(id){
			// this.players.push(new Player(id));
		});
	}



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