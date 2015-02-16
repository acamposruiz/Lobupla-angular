/* Module dependencies. */
var express = require('express')
  , http = require('http');

var app = express(); 
var server = http.createServer(app);

app.use('/styles', express.static(__dirname + '/styles')); 

app.get('/', function(req, res){
  //res.send('Hello World!!');
  res.sendFile('./index.html', {"root": __dirname});
});

app.listen(3000);
