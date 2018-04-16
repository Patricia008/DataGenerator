'use strict';

const mongoConnectionService = require('./services/mongoConnectionService');
const insertDataService = require('./services/insertDataService');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        
        server.route({
            method: 'GET',
            path: '/checkConnection',
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            handler: function (request, h) {

                return mongoConnectionService.checkConnection(options.mongoDBUrl)
                    .then((response) => {
                            const reply = h.response(response);
                            reply.type('text/plain');
                            reply.code(response ? 200 : 418);
                            return reply;
                        });               
            }
        });


        server.route({
            method: 'POST',
            path: '/insertData',
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            handler: function (request, h) {

                return insertDataService.insertAndAggregateData(options.mongoDBUrl, process.env.OPEN_URL, process.env.DATABASE_NAME, process.env.COLLECTION_NAME);

                //return insertDataService.insertData(options.mongoDBUrl, process.env.OPEN_URL);
                        // .catch((err) => {
                        //     console.log(err);
                        //     const reply = h.response('Data insertion failed!');
                        //     reply.type('text/plain');
                        //     reply.code(500);
                        //     return reply;
                        // })
                        // .then((response) => {
                        //     const reply = h.response(response == false ? 'Data insertion failed!' : 'Data inserted successfully.');
                        //     reply.type('text/plain');
                        //     reply.code(response == false ? 500 : 200);
                        //     return reply;
                        // });
            }
        });


        server.route({
            method: 'GET',
            path: '/getExecutionTime',
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            handler: function (request, h) {
                
                const reply = h.response(insertDataService.getExecutionTime());
                reply.type('text/plain');
                reply.code(200);
                return reply;
            }
        });

    }
};