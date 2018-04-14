'use strict';

const MongoConnectionService = require('../services/mongoConnectionService');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        
        server.route({
            method: 'GET',
            path: '/checkConnection',
            handler: function (request, h) {

                return MongoConnectionService.checkConnection(options.mongoDBUrl);
            }
        });

        // etc...
        //await someAsyncMethods();
    }
};