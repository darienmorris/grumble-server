var Hapi = require('hapi');
var pg = require('pg');

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

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