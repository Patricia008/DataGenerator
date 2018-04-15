'use strict'

const MongoClient = require('mongodb').MongoClient;
const request = require("request");
const aggregateDataService = require('./aggregateDataService');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var getTime = function () {
  console.log('???????event I hear a scream!');
}

module.exports = {

  insertAndAggregateData: function (mongoURL, openUrl, databaseName, collectionName){

    eventEmitter.on('doneAggregating', getTime);
    MongoClient.connect(mongoURL, function(err, db) {
      if (err){
        console.log(err);
        process.exit(1);
      }

      request.get(openUrl, (error, resp, body) => {
        
        if (!error && resp.statusCode === 200) {
            let json = JSON.parse(body);

            var tracks = [];
            for(let i=0; i<json.resultCount; i++){
              let track = {};

              track.id = i;
              track.artistName = json.results[i].artistName;
              track.trackName = json.results[i].trackName;
              track.collectionName = json.results[i].collectionName;
              track.releaseDate = json.results[i].releaseDate;
              track.trackViewUrl = json.results[i].trackViewUrl;
              track.collectionViewUrl = json.results[i].collectionViewUrl;
              track.trackPrice = json.results[i].trackPrice;
              track.collectionPrice = json.results[i].collectionPrice;
              track.currency = json.results[i].currency;
              track.collectionExplicitness = json.results[i].collectionExplicitness;
              track.trackCount = json.results[i].trackCount;
              track.trackNumber = json.results[i].trackNumber;
              track.trackTimeMillis = json.results[i].trackTimeMillis;
              track.primaryGenreName = json.results[i].primaryGenreName;
              
              tracks.push(track);
            }

            var dbo = db.db(databaseName);

            dbo.collection(collectionName).insertMany(tracks, function(err, res) {
              if (err){
                console.log(err);
                process.exit(1);
              }
              console.log("Number of tracks inserted: " + res.insertedCount);
              db.close();
              aggregateDataService.findCollaborationSongs(mongoURL, databaseName, collectionName, eventEmitter);
            });
        }
      }) 

    });
  }



};
