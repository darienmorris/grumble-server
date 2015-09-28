var _ = require('lodash');
var Boom = require('boom');
var cache = require(__dirname+'/../data/cache');


class MatchMaker {

	static generateToken() {
	    var date = Date.now();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(cauliflower) {
	        var random = (date + Math.random()*16)%16 | 0;
	        date = Math.floor(date/16);
	        return (cauliflower=='x' ? random : (random&0x3|0x8)).toString(16);
	    });
	    return uuid;
	}

	static validateToken(userID, token) {
		// Compares the token parameter with the stored token
	}

}

module.exports = MatchMaker;