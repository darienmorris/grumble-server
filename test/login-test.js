var request = require('request');
var assert = require('assert');

describe("Testing login...", function() {
	var time = (new Date()).getTime();
	it("should return some data", function(done) {
		var credentials = {username:'darien.morris', password:'test'};

		request({
			url: 'http://localhost:8000/user/login',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			console.log(body);
			// assert.ok(body.token);
			done();
		});
	});
});