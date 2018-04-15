'use strict';

const mongoConnectionService = require('./services/mongoConnectionService');
const insertDataService = require('./services/insertDataService');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        
        server.route({
            method: 'GET',
            path: '/checkConnection',
            handler: function (request, h) {

                return mongoConnectionService.checkConnection(options.mongoDBUrl);
            }
        });
        server.route({
            method: 'POST',
            path: '/insertData',
            handler: function (request, h) {

                insertDataService.insertAndAggregateData(options.mongoDBUrl, process.env.OPEN_URL, process.env.DATABASE_NAME, process.env.COLLECTION_NAME);
                return 'ok';

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
    }
};