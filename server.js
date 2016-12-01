var express = require('express');
var path = require('path');
var mongodb = require('mongodb'); 

var app = express();
var port = process.env.PORT || 3000;

// try to get mongodb connection working...
// with the other user/password
var mongoDbUrl = 'mongodb://monguser:mongopw!@127.0.0.1:27017/Guardians';
var mongoClient = mongodb.MongoClient;
mongoClient.connect(mongoDbUrl, function(err, db) {
    if(err){
        // but got following error...
        // error: MongoError: failed to connect to server [127.0.0.1:27017] on first connect
        console.log("error connection to database. Is database started?");
        console.log("error: " + err);
    }
    else{
        console.log("Connected correctly to server");
        dbObservations = db.collection('projects');
    }
});    


app.use(express.static(path.join(__dirname, 'app')));
var server = app.listen(port);
module.exports = server;
console.log('Earthwatchers server started on port ' + port);