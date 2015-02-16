/* Module dependencies. */
var express = require('express')
  , http = require('http');

var app = express(); 
var server = http.createServer(app);

app.get('/', function(req, res){
  res.send('Hello World!!');
});

app.listen(3000);
