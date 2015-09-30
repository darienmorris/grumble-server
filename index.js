var fs = require('fs');
var Hapi = require('hapi');
var pg = require('pg');
var config = require(__dirname + '/config/development');
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
        var conString = "postgres://"+config.db.sql.user+":"+config.db.sql.password+"@"+config.db.sql.server+"/"+config.db.sql.database+'?ssl=true';
        pg.connect(conString, function(err, client, done) {
            if(err) {
            }
            else {
                client.query('SELECT * FROM users', function(err, result) {
                    //call `done()` to release the client back to the pool 
                    done();

                    if(err) {
                        console.log("there is an error", err);
                      // return console.error('error running query', err);
                    }

                    reply(result.rows);
                });
            }
          
        });
    }
});

// this route is for testing the battle class
server.route({
    method: 'GET',
    path:'/battle', 
    handler: function (request, reply) {
        fs.readFile(__dirname + "/html/battle.html", "utf8", function (err,data) {
            if (err) {
                return console.log(err);
            }
            reply(data);
        });
    }
});

// Start the server
server.start(function() {
     console.log('Server running at:', server.info.uri);
});