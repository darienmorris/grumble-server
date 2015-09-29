var _ = require('lodash');
var Boom = require('boom');
var Cache = require(__dirname+'/../data/cache');


class MatchMaker {
	constructor() {
		this.cache = new Cache();
	}
	
	joinQuickMatch(userID) {
		this.addToQueue(userID, MatchMaker.QUICK_MATCH);
		this.lookForMatches(MatchMaker.QUICK_MATCH);
	}

	addToQueue(userID, gameType) {
		this.cache.hset(gameType, userID, JSON.Stringify({userID:userID}));

	}

	removeFromQueue(userID, gameType) {

	}

	getUsersInQueue(gameType) {

	}

	lookForMatches(gameType) {
		var users = getUsersInQueue(gameType);
		
	}
}

MatchMaker.QUICK_MATCH = "quick-match";

module.exports = MatchMaker;