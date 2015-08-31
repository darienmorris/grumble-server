var request = require('request');
var assert = require('assert');

describe("Testing registration...", function() {
	var time = (new Date()).getTime();
	it("should successfully register on unique username", function(done) {
		var credentials = {name:'Test', username:'test-'+time, password:'test'};

		request({
			url: 'http://localhost:8000/user/register',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	it("should return a 409 on existing username", function(done) {
		var credentials = {name:'Test', username:'darien.morris', password:'test'};

		request({
			url: 'http://localhost:8000/user/register',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(res.statusCode, 409);
			done();
		});
	});

	it("should return a 422 when leaving out parameters", function(done) {
		var credentials = {name:'Test', password:'test'};

		request({
			url: 'http://localhost:8000/user/register',
			method: 'post',
			form: credentials,
		}, function(err, res, body) {
			assert.equal(res.statusCode, 422);
			done();
		});
	});
});