"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        track: track,
        language: "en"
    });
    stream.on("error", console.log);
    stream.on("tweet", function (status) {
        console.log(status);
        try {
            io.emit("tweet", status);
        }
        catch (e) {
            console.log(e);
        }
    });
};
//# sourceMappingURL=streaming.js.map