var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 ,
    labels: ['api']
});

var io = require('socket.io')(server.select('api').listener);

io.on('connection', function(socket) {
	console.log("connection!");
	socket.emit('A user connected');

	socket.on('typing', function(message) {
		io.emit('typing', message);
	});

});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
       reply('hello world');
    }
});

// Start the server
server.start(function() {
     console.log('Server running at:', server.info.uri);
});