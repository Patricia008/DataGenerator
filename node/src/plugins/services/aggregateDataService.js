'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports={

	findCollaborationSongs: function (mongoURL, databaseName, collectionName, eventEmitter){
		MongoClient.connect(mongoURL, function(err, db) {
		  if (err){
		  	console.log(err);
        return false;
		  }
		  let dbo = db.db(databaseName);

		  //for each album, count how many collaboration songs there are.
		  dbo.collection(collectionName).aggregate([
          {$match: {trackName: /.*feat\..*/ }},
        	{
        		$group: {
	            _id: "$collectionName",
	            total: { $sum: 1 }
	          }
          }
      ]).toArray(function(err, result) {
		    if (err){
		  		console.log(err);
        	return false;
		 	 	}

			  console.log("Successfully found ", result.length, " collections that contain collaboration songs:\n", result);
			  db.close();
			  eventEmitter.emit('doneAggregating');
		  });
      
		});

	}
}
