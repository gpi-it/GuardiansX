var express = require('express');
var path = require('path');
var mongodb = require('mongodb'); 

var app = express();
var port = process.env.PORT || 3000;

var mongoDbUrl = 'mongodb://mongo:27017';
var mongoClient = mongodb.MongoClient;
mongoClient.connect(mongoDbUrl, function(err, db) {
    if(err){
        console.log("error connection to database. Is database started?");
        console.log("error: " + err);
    }
    else{
        console.log("Connected correctly to server");
        dbObservations = db.collection('projects');
    }
})

app.use(express.static(path.join(__dirname, '../client')));
var server = app.listen(port);
module.exports = server;
console.log('Earthwatchers server started on port ' + port);