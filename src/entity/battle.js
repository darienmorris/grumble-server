var _ 		= require("lodash"),
	User 	= require(__dirname + "/user");


// TODO: Investigate socket rooms and emitting events within that room
// TODO: Investigate emitting events to a single user

export default class Battle {

	constructor(io, userIDs) {
		console.log("Battle Init!");
		this.io = io;
		this.userIDs = userIDs;
		this.battleStarted = false;
		
		// instantiate player class for each userID (this param should be an array of IDs)
		this.createPlayers();

		// Create a socket connection with both players (once connection for each)
			// Should the player class handle this??
		this.onPlayerConnect();

		console.log(" ");

	}

	createPlayers() {
		this.players = [];

		this.userIDs.forEach(function(id){
			console.log(id);

			// Todo: when Player class is created, instantiate player here
			// this.players.push(new Player(id));
		}.bind(this));
	}

	
	toggleTurn(playerID) {
		var i = this.players.indexOf(playerID);
		this.turn.now = this.players[Math.abs(i - 1)];
		console.log(this.turn.now);
	}

	onPlayerConnect() {
		console.log("connect players");
		let self = this;
		
		this.io.on("connection", function(socket) {
			// onNewPlayerID sets this value for other methods to use.
			socket.playerID;

			// There can only be two players connected in a game,
			// so kill the socket and return the callback if there is more.
			// We will probably handle this another way though.
			if(self.players.length >= 2){
				console.log("battle is already full.");
				socket.disconnect();
				return;
			}

			self.onNewPlayerID(socket);
			self.onSendMessage(socket);
			self.onEndTurn(socket);
			self.onDisconnect(socket);
		});
	}

	onNewPlayerID(socket) {
		let self = this;
		socket.on("player id", function(id){
			socket.playerID = id;
			self.players.push(id);
			if(self.players.length == 2){
				// todo: create a more generic method to call all methods needed to start the battle.
				self.establishTurnOrder();
			}
			self.io.emit("player count", self.players.length);
		});
	}

	establishTurnOrder() {
		if(!this.battleStarted){
			console.log("establish turn order");
			this.turn = {};
			this.turn.first = this.players[_.random(0, this.players.length - 1)];
			this.turn.now = this.turn.first;
			this.battleStarted = true;
		}
	}

	onSendMessage(socket) {
		let self = this;
		socket.on("send message", function(message) {
			if(socket.playerID == self.turn.now){
				self.emitMessage(socket, message);
			} else {
				self.emitNotYourTurn(socket);
			}		
		});
	}

	onEndTurn(socket) {
		let self = this;
		socket.on("end turn", function(){
			if(socket.playerID == self.turn.now){
				self.toggleTurn(socket.playerID);
				self.emitMessage(socket, "has ended their turn");
			} else {
				self.emitNotYourTurn(socket);
			}
		});
	}

	onDisconnect(socket) {
		let self = this;
		socket.on('disconnect', function(){				
			let i = self.players.indexOf(socket.playerID);
			self.players.splice(i, 1);
			console.log('user disconnected');
			socket.disconnect();
		});
	}

	emitMessage(socket, message) {
		message = socket.playerID + ": " + message;
		this.io.emit("send message", message);
	}

	emitNotYourTurn(socket) {
		// TODO: Find out other ways to emit to specific users.
		// might be socket.emit as per the second answer: http://stackoverflow.com/questions/4647348/send-message-to-specific-client-with-socket-io-and-node-js
		// alternatively, if you don't have the socket object, this.io.sockets.socket(socketID).emit(message);
		this.io.emit(socket.playerID + " not your turn");
	}

}