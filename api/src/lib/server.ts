const socketio = require("socket.io");
const express = require("express");
const path = require("path");

let app = express();
let http = require("http").Server(app);
let io = socketio(http);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));

module.exports = http;