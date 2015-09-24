var request = require('request');
var assert = require('assert');
var redis = require('redis');


describe("Testing redis...", function() {
	it("should connect!", function(done) {
		client = redis.createClient(10111, "pub-redis-10111.us-east-1-4.6.ec2.redislabs.com");
		client.auth("Burningstar4", function() {
			console.log("Connected!");
		});
	});
});