'use strict'

var MongoClient = require('mongodb').MongoClient;
var isConnected = null;
 
module.exports = {

  checkConnection: function (mongoURL){

    return MongoClient.connect(mongoURL)
      .catch((err) => {
        console.log(err);
        return false;
      })
      .then((response) => {
        if(response == null || response == false){
          return false;
        }

        response.close();
        return true;
      });
  }
};
