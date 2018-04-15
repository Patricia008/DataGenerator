'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports={

	aggregateData: function (mongoURL, databaseName, collectionName){
		MongoClient.connect(mongoURL, function(err, db) {
		  if (err){
		  	console.log(err);
        return false;
		  }
		  var dbo = db.db(databaseName);
		  dbo.collection(collectionName).find({}).toArray(function(err, result) {
		    if (err){
		  		console.log(err);
        	return false;
		 	 	}
		    console.log(result);
		    db.close();
		  });
		});

	}
}
