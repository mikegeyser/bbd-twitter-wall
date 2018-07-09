"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config = require("config");
var socketio = require("socket.io");
var express = require("express");
var http = require("http");
var app = express();
var server = http.Server(app);
var io = socketio(server);
var Twit = require("twit");
config.debug = process.argv.filter(function (arg) { return arg === "--debug" || arg === "-d"; }).length > 0;
if (config.debug) {
    console.log("DEBUG");
}
console.log(JSON.stringify(config, null, 2));
app.use(express.static(path.join(__dirname, "public")));
var track = []
    .concat(config.event.screen_names)
    .concat(config.event.hashtags)
    .join(",");
if (config.debug) {
    track += ",#javascript";
}
var T = new Twit(config.twitter);
var follow = "";
console.log("track", track);
var stream = T.stream("statuses/filter", {
    track: track,
    language: "en"
});
stream.on("error", console.log);
var tweets = [];
stream.on("tweet", function (status) {
    console.log("ID: " + status.id + "; User: " + status.user.id + "; Text: " + status.text);
    var exists = tweets.filter(function (t) {
        var idMatch = t.id == status.id;
        var textMatch = t.text == status.text;
        var userMatch = t.user && status.user && (t.user.id == status.user.id);
        return idMatch || (textMatch && userMatch);
    }).length;
    if (exists)
        return;
    try {
        tweets.unshift(status);
        if (tweets.length > 100) {
            tweets.splice(100);
        }
        io.emit("tweet", status);
    }
    catch (e) {
        console.log(e);
    }
});
var cors = require('cors');
app.use(cors());
app.get('/tweets', function (request, response) { return response.send(tweets); });
server.listen(config.express.port);
//# sourceMappingURL=index.js.map