var redis = require('redis');
var config = require(__dirname + '/../../config/development');

class Cache {
	constructor(callback) {
		this.client = redis.createClient(config.db.redis.port, config.db.redis.server);
		this.client.auth(config.db.redis.password, callback);
	}
}

module.exports = Cache;