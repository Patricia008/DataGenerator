'use strict';

const Hapi = require('hapi');
const MongoDBUrl = 'mongodb://localhost:27017';

var MongoClient = require('mongodb').MongoClient


// Use connect method to connect to the server
var connectionStatus = MongoClient.connect(MongoDBUrl, function(err, db) {

  if (err) {
    //console.log(err);
    console.log("Connection to Mongo not established");

  }
  else {
        db.close();
        console.log("Connected successfully to Mongo");       
  }

});

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8080
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return 'Hello';
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();