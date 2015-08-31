var request = require('request');
var assert = require('assert');

describe("Testing login...", function() {
	it("should return a token on valid login", function(done) {
		var credentials = {username:'darien.morris', password:'test'};

		request({
			url: 'http://localhost:8000/user/login',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(200, res.statusCode);
			
			var data = JSON.parse(body);
			assert.ok(data.token);
			done();
		});
	});

	it("should return a 401 on valid username but invalid password", function(done) {
		var credentials = {username:'darien.morris', password:'badpassword'};

		request({
			url: 'http://localhost:8000/user/login',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(401, res.statusCode);
			done();
		});
	});

	it("should return a 404 on invalid username", function(done) {
		var credentials = {username:'fake-username-that-doesnt-exist-hopefully', password:'anypassword'};

		request({
			url: 'http://localhost:8000/user/login',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(404, res.statusCode);
			done();
		});
	});
});