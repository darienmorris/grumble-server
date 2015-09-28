var request = require('request');
var assert = require('assert');
var redis = require('redis');
var Cache = require(__dirname + '/../dist/data/cache');
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
});