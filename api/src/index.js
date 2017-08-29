"use strict";
var path = require("path");
var api = require("./lib/api");
var config = require("config");
var express = require("express");
var http = require("http");
var streaming = require("./lib/streaming");
config.debug = process.argv.filter(function (arg) { return arg === "--debug" || arg === "-d"; }).length > 0;
if (config.debug) {
    console.log("DEBUG");
}
console.log(JSON.stringify(config, null, 2));
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use('/api', api);
var server = http.Server(app);
streaming(server, config);
server.listen(config.express.port);
//# sourceMappingURL=index.js.map