var _ 		= require("lodash"),
	User 	= require(__dirname + "/user");


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
		this.connectPlayers();

		console.log(" ");
	}

	createPlayers() {
		this.players = [];

		this.userIDs.forEach(function(id){
			console.log(id);

			// Todo: when Player class is created, instantiate player here
			// this.players.push(new Player(id));
			// this.players.push(id);
		}.bind(this));
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

	toggleTurn(playerID) {
		var i = this.players.indexOf(playerID);
		this.turn.now = this.players[Math.abs(i - 1)];
		console.log(Math.abs(i - 1));
		console.log(this.turn.now);
	}

	connectPlayers() {
		console.log("connect players");
		let self = this;
		
		this.io.on("connection", function(socket) {
			// onNewPlayerId sets this value for other methods to use.
			socket.playerID;

			// There can only be two players connected in a game,
			// so kill the socket and return the callback if there is more.
			// We will probably handle this another way though.
			if(self.players.length >= 2){
				console.log("battle is already full.");
				socket.disconnect();
				return;
			}

			self.onNewPlayerId(socket);
			self.onSendMessage(socket);
			self.onEndTurn(socket);
			self.onDisconnect(socket);
		});
	}

	onNewPlayerId(socket) {
		let self = this;
		socket.on("player id", function(id){
			socket.playerID = id;
			self.players.push(id);
			if(self.players.length == 2){
				self.establishTurnOrder();
			}
			self.io.emit("player count", self.players.length);
		});
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
		this.io.emit(socket.playerID + " not your turn");
	}

}