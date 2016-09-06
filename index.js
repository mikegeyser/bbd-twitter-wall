var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var Twit = require("twit");
var T = new Twit({
  consumer_key: "{Your consumer key}",
  consumer_secret: "{Your consumer secret}",
  access_token: "{Your access token}",
  access_token_secret: "{Your access token secret}",
  timeout_ms: 60000
});

var stream = T.stream("statuses/filter", {
    track: "#javascript, @bbdsoftware, #WTC, @wethinkcode"
});

stream.on("tweet", function(status) {
    console.log({
        name: status.user.screen_name,
        text: status.text,
        created_at: status.created_at
    });

    io.emit("tweet", {
        name: status.user.screen_name,
        text: status.text,
        created_at: status.created_at
    });
});
