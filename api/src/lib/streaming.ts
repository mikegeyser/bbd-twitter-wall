import * as socketio from "socket.io";

module.exports = function (http, config) {
  let io = socketio(http);

  let track = []
    .concat(config.event.screen_names)
    .concat(config.event.hashtags)
    .join(",");

  if (config.debug) {
    track += ",#javascript";
  }

  const Twit = require("twit");
  let T = new Twit(config.twitter);
  let follow = "";
  console.log("track", track);

  let stream = T.stream("statuses/filter", {
    // follow: follow,
    track: track,
    language: "en"
    // filter_level: "low"
  });

  stream.on("error", console.log);

  stream.on("tweet", (status) => {
    try {
      io.emit("tweet", status);
    }
    catch (e) {
      console.log(e);
    }
  });
};