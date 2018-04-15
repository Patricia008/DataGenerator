'use strict'

const MongoClient = require('mongodb').MongoClient;
const request = require("request");

module.exports = {

  insertData: function (mongoURL, openUrl){

    //create database
    MongoClient.connect(mongoURL+'dataGenerationDb', function(err, db) {
      if (err){
        console.log(err);
        process.exit(1);
      }
      console.log("Database created!");
      db.close();
    });

    //create collection
    MongoClient.connect(mongoURL, function(err, db) {
      if (err){
        console.log(err);
        process.exit(1);
      }
      var dbo = db.db("dataGenerationDb");
      dbo.createCollection("tracks", function(err, res) {
        if (err){
          console.log(err);
          process.exit(1);
        }
        console.log("Collection created!");
        db.close();
      });
    });

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

            var dbo = db.db("dataGenerationDb");

            dbo.collection("tracks").insertMany(tracks, function(err, res) {
               if (err){
                  console.log(err);
                  process.exit(1);
              }
              console.log("Number of tracks inserted: " + res.insertedCount);
              db.close();
            });

          } 
        });
        db.close();
    });
  }
};
