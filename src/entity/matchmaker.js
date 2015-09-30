var _ = require("lodash");
var Boom = require("boom");
var Cache = require(__dirname+"/../data/cache");
var User = require(__dirname+"/user");


class MatchMaker {
	constructor() {
		this.cache = new Cache();
	}
	
	joinQuickMatch(userID, callback) {
		let ranking = User.getRanking(userID);
		this.addToQueue(userID, ranking, MatchMaker.QUICK_MATCH);
		this.lookForMatches(userID, MatchMaker.QUICK_MATCH, callback);
	}

	addToQueue(userID, gameType) {
		this.cache.hset(gameType, userID, JSON.Stringify({userID:userID}));

	}

	removeFromQueue(userID, gameType) {

	}

	getUsersInQueue(gameType) {

	}

	lookForMatches(userID, gameType) {
		var users = this.getUsersInQueue(gameType);
		
	}
}

MatchMaker.QUICK_MATCH = "quick-match";

module.exports = MatchMaker;