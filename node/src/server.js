'use strict';

const Hapi = require('hapi');
const MongoDBUrl = process.env.MONGO_URL;


const server=Hapi.server({
    host:'0.0.0.0',
    port:8080
});

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(MongoDBUrl, function(err, db) {
  if(!err) {
    console.log("!!!!!!!!!!!!We are connected");
    db.close();
  }
  else{
    console.log("???????Not connected to db");
  }
});

async function start() {

    try {

        await server.register({
            plugin:require('./plugins/serveEndpoints'),
            options: {
                mongoDBUrl: MongoDBUrl
            }
        });
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('>>>>>>Server running');
};

start();
