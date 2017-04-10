"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = process.argv.filter(function (arg) { return arg === "--debug" || arg === "-d"; }).length > 0;
if (debug) {
    console.log("DEBUG");
}
var config = require("config");
console.log(JSON.stringify(config, null, 2));
var socketio = require("socket.io");
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var io = socketio(http);
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", require("./lib/api"));
var template = require("ejs").compile(require("fs").readFileSync(path.resolve(__dirname, "./templates/tweet.ejs"), "utf8"), {});
var track = [].concat(config.event.organizers).concat(config.event.speakers).map(function (screen_name) { return "@" + screen_name; }).concat(config.event.hashtags.map(function (hashtag) { return "#" + hashtag; })).join(",");
if (debug) {
    track += ",#javascript";
}
var Twit = require("twit");
var T = new Twit(config.twitter);
var follow = "";
console.log("track", track);
var stream = T.stream("statuses/filter", {
    track: track,
    language: "en"
});
stream.on("error", console.log);
stream.on("tweet", function (status) {
    try {
        io.emit("tweet", status);
    }
    catch (e) {
        console.log(e);
    }
});
http.listen(config.express.port);
//# sourceMappingURL=index.js.map