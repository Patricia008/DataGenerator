'use strict';

const Hapi = require('hapi');
const MongoDBUrl = process.env.MONGO_URL;
const MongoClient = require('mongodb').MongoClient;

const server=Hapi.server({
    host:'0.0.0.0',
    port:8080
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

    console.log('>>>>>> Hapi server running');
};

start();
