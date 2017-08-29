import * as socketio from "socket.io";

module.exports = function (http: any, config: any) {
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
    follow: "897361155747979264,899979417296003072,899573522485448704,899570667825352706",
    track: track,
    language: "en",
    filter_level: "none"
  });

  stream.on("error", console.log);

  let tweets = [];
  stream.on('tweet', (status) => {
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

  io.on('connection', (socket) => {
    socket.on("get_all_tweets", () => {
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