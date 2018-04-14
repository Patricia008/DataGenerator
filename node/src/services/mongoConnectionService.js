'use strict'

var MongoClient = require('mongodb').MongoClient;
var isConnected = null;
 
module.exports = {

  checkConnection: function (mongoURL){

MongoClient.connect(MongoDBUrl, function(err, db) {
  if(!err) {
    console.log("!!!!!!!!!!!!We are connected");
    db.close();
  }
  else{
    console.log("???????Not connected to db");
  }
});




  console.log(">>>url ",mongoURL);

  return MongoClient.connect(mongoURL)
    .catch((err) => {
      console.log(err);
      return false;
    })
    .then((response) => {
      console.log("after connect ", response);
      return response;
    });
}
};
