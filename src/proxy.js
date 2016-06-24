const https = require('https');
const http = require('http');

http.createServer(function(req, res){
  console.log('request was made: ' + req.url);
  var options ={
    host: 'www.easysend.pl',
    path: req.url,
    accept: 'application/json, text/plain, /*'
  };
  var placeForData = '';

  https.get(options, function(response) {
    // Continuously update stream with data
    response.on('data', function(chunk) {
        placeForData += chunk;
    });
    response.on('end', function() {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead('200', {'Content-Type': 'plain/text'});
      res.end(placeForData);
    });
  });

}).listen(3000, '127.0.0.1');
console.log('Port 3000 is listening.');
