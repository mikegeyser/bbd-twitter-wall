"use strict";
var socketio = require("socket.io");
module.exports = function (http, config) {
    var io = socketio(http);
    var track = []
        .concat(config.event.screen_names)
        .concat(config.event.hashtags)
        .join(",");
    if (config.debug) {
        track += ",#javascript";
    }
    var Twit = require("twit");
    var T = new Twit(config.twitter);
    var follow = "";
    console.log("track", track);
    var stream = T.stream("statuses/filter", {
        follow: "897361155747979264,899979417296003072,899573522485448704,899570667825352706",
        track: track,
        language: "en",
        filter_level: "none"
    });
    stream.on("error", console.log);
    var tweets = [];
    stream.on('tweet', function (status) {
        console.log(status);
        tweets.unshift(status);
        if (tweets.length > 100)
            tweets.splice(100);
        try {
            io.emit("tweet", status);
        }
        catch (e) {
            console.log(e);
        }
    });
    io.on('connection', function (socket) {
        socket.on("get_all_tweets", function () {
            console.log("Load all tweets.");
            try {
                socket.emit("all_tweets", tweets);
            }
            catch (e) {
                console.log(e);
            }
        });
    });
};
//# sourceMappingURL=streaming.js.map