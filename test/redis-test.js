var request = require('request');
var assert = require('assert');
var redis = require('redis');
var Cache = require(__dirname + '/../dist/data/cache');
var MatchMaker = require(__dirname + '/../dist/entity/matchmaker');
var config = require(__dirname + '/../config/development');


describe("Testing redis...", function() {
	it("should connect!", function(done) {
		var cache = new Cache(function() {
			done();
		});

	});

	it("should save data and read from it!", function(done) {
		var cache = new Cache();

		cache.client.set("testKey", "testVal");
		
		cache.client.get("testKey", function(err, reply) {
			console.log("should be testVal: "+reply);
			assert.equal("testVal", reply);
			done();
		});

	});

	it("should save complicated data and read from it!", function(done) {
		var cache = new Cache();
		var userID = 1;
		var userData = {name:"Darien", id: userID};
		cache.client.hset("quick-match-queue", userData.id, JSON.stringify(userData), redis.print);
		cache.client.hgetall("quick-match-queue", function(err, obj) {
			console.log(obj);
			for(id in obj) {
				var data = JSON.parse(obj[id]);
				assert.equal(data.id,userID);
			}
			done();
		});

		cache.client.hdel("quick-match-queue", userData.id);
	});

	// it("should be able to add a user to a quick match queue", function(done) {
	// 	var matchmaker = new MatchMaker();
	// 	var userID = 1

	// 	matchmaker.joinQuickMatch(userID);
	// 	var users = matchmaker.getUsersInQueue(MatchMaker.QUICK_MATCH);
	// 	users.forEach(function(user) {
	// 		console.log(user);
	// 	});

	// 	done();
	// });
});