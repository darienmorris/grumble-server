var Hapi = require("hapi");
var pg = require("pg");
var _ = require("lodash");
var config = require(__dirname + "/config/development");
var User = require(__dirname + "/dist/entity/user");

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: "localhost", 
    port: 8000 ,
    labels: ["api"]
});

var io = require("socket.io")(server.select("api").listener);

io.on("connection", function(socket) {
	console.log("connection!");
	socket.emit("A user connected");

	socket.on("typing", function(message) {
		io.emit("typing", message);
	});

});

// Add the route
server.route({
    method: "POST",
    path:"/user/login", 
    handler: function (request, reply) {
        User.login(request.payload, function(err, result) {
            if(err) {
                return reply(err);
            }

            return reply(result);
        });
    }
});

server.route({
    method: "POST",
    path:"/user/register",
    handler: function(request, reply) {
        User.register(request.payload, function(err, result) {
            if(err) {
                return reply(err);
            }

            return reply(result);
        });
    }
});

// Start the server
server.start(function() {
     console.log("Server running at:", server.info.uri);
});