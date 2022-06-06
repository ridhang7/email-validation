var app = require('app');
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync("/etc/letsencrypt/live/workpatternz.in/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/workpatternz.in/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/workpatternz.in/cert.pem")
};

https.createServer(options, function (req, res) {
 res.writeHead(200);
 res.end("Welcome to Node.js");
 app.listen(80,()=>console.log("server running on port 80"))  
}).listen(443)
