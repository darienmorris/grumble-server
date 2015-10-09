"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redis = require("redis");
var config = require(__dirname + "/../../config/development");

var Cache = function Cache(callback) {
	_classCallCheck(this, Cache);

	this.client = redis.createClient(config.db.redis.port, config.db.redis.server);
	this.client.auth(config.db.redis.password, callback);
};

module.exports = Cache;