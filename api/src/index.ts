let debug = process.argv.filter((arg) => arg === "--debug" || arg === "-d").length > 0;
if (debug) {
    console.log("DEBUG");
}

const config = require("config");
console.log(JSON.stringify(config, null, 2));

// import { Indexer } from "./lib/indexer";
import { Twitter } from "./lib/twitter";


/**
 * Express + Socket.io
 */

const socketio = require("socket.io");
const express = require("express");

const path = require("path");

let app = express();
let http = require("http").Server(app);
let io = socketio(http);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", require("./lib/api"));

/**
 * Twitter 
 */

const template = require("ejs").compile(require("fs").readFileSync(path.resolve(__dirname, "./templates/tweet.ejs"), "utf8"), {});

let track = [].concat(config.event.organizers).concat(config.event.speakers).map((screen_name) => "@" + screen_name).concat(config.event.hashtags.map((hashtag) => "#" + hashtag)).join(",");
if (debug) {
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
        // let socialMediaPosting = Twitter.asSocialMediaPosting(status);
        // socialMediaPosting.articleBody = template(status);
        io.emit("tweet", status);
    }
    catch (e) {
        console.log(e);
    }
});

http.listen(config.express.port);