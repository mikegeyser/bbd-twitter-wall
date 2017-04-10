var socketio = require("socket.io");
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var io = socketio(http);
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));
module.exports = http;
//# sourceMappingURL=server.js.map