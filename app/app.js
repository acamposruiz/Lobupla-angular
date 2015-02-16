/* Module dependencies. */
var express = require('express')
  , http = require('http');

var app = express(); 
var server = http.createServer(app);

app.use('/styles', express.static(__dirname + '/styles')); 
app.use('/scripts', express.static(__dirname + '/scripts')); 
app.use('/views', express.static(__dirname + '/views')); 
app.use('/bower_components', express.static(__dirname + '/bower_components')); 

app.get('/', function(req, res){
  //res.send('Hello World!!');
  res.sendFile('./index.html', {"root": __dirname});
});

app.listen(3008);
