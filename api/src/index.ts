import * as path from "path";
import * as config from "config";
import * as socketio from "socket.io";

const express = require("express");
const http = require("http");
const app = express();
const server = http.Server(app);
const io = socketio(server);
const Twit = require("twit");

config.debug = process.argv.filter(arg => arg === "--debug" || arg === "-d").length > 0;

if (config.debug) {
    console.log("DEBUG");
}

console.log(JSON.stringify(config, null, 2));

app.use(express.static(path.join(__dirname, "public")));

let track = []
    .concat(config.event.screen_names)
    .concat(config.event.hashtags)
    .join(",");

if (config.debug) {
    track += ",#javascript";
}

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

let tweets = [];

stream.on("tweet", status => {
    // console.log(status);
    console.log(`ID: ${status.id}; User: ${status.user.id}; Text: ${status.text}`);

    let exists = tweets.filter(t => {
        const idMatch = t.id == status.id; // Exact duplicate tweet
        const textMatch = t.text == status.text; // Same text
        const userMatch = t.user && status.user && (t.user.id == status.user.id); // Same user

        return idMatch || (textMatch && userMatch);
    }).length;

    if (exists) return;

    try {
        tweets.unshift(status);

        if (tweets.length > 100) {
            tweets.splice(100);
        }

        io.emit("tweet", status);
    } catch (e) {
        console.log(e);
    }
});

var cors = require('cors');
app.use(cors());
app.get('/tweets', (request, response) => response.send(tweets));

server.listen(config.express.port);
