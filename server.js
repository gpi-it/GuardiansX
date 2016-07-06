var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'app')));
var server = app.listen(port);
module.exports = server;
console.log('Earthwatchers server started on port ' + port);