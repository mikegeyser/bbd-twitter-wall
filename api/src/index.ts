import * as path from "path";
import * as api from "./lib/api";
import * as config from "config";

var express = require("express");
var http = require("http");
var streaming = require("./lib/streaming");

config.debug = process.argv.filter((arg) => arg === "--debug" || arg === "-d").length > 0;

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