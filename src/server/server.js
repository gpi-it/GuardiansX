var express = require('express');
var path = require('path');
var mongodb = require('mongodb'); 
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

var expressLogFile = fs.createWriteStream(__dirname + '/express.log', {
    flags: 'a'
});


/**
 * todo: add database stuff
var mongoDbUrl = 'mongodb://localhost:27017';
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
*/

var router = express.Router();

// get root document
router.get('/', function (req, res) {
    res.json({
        message: 'Earthwatchers serverside'
    });
});

app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client')));
var server = app.listen(port);
module.exports = server;
console.log('Earthwatchers server started on port ' + port);
