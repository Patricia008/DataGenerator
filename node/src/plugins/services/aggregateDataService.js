'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports={

	findCollaborationSongs: function (mongoURL, databaseName, collectionName){
		MongoClient.connect(mongoURL, function(err, db) {
		  if (err){
		  	console.log(err);
        return false;
		  }
		  var dbo = db.db(databaseName);

		  var query = {trackName: /.*feat\..*/ };
		  dbo.collection(collectionName).find(query).toArray(function(err, result) {
		    if (err){
		  		console.log(err);
        	return false;
		 	 	}
		    console.log("Successfully found ", result.length, " entries that are collaboration songs.");
		    db.close();
		  });
		});

	}
}
