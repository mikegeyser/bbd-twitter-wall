import * as express from "express";
import * as path from "path";
import * as api from "./lib/api";
import * as config from "config";
import * as http from "http";
import * as streaming from "./lib/streaming";

config.debug = process.argv.filter((arg) => arg === "--debug" || arg === "-d").length > 0;

if (config.debug) {
    console.log("DEBUG");
}

console.log(JSON.stringify(config, null, 2));

var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

console.log(http);
var server = http.Server(app);
streaming(server, config);


server.listen(config.express.port);