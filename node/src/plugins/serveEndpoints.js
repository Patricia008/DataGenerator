'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {

                return 'hello, world';
            }
        });

        // etc...
        //await someAsyncMethods();
    }
};