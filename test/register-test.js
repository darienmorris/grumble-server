var request = require('request');
var assert = require('assert');

describe("Testing registration...", function() {
	var time = (new Date()).getTime();
	it("should return some data", function(done) {
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
});