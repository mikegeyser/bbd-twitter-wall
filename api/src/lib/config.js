"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("config");
console.log(JSON.stringify(exports.config));
exports.config.debug = process.argv.filter(function (arg) { return arg === "--debug" || arg === "-d"; }).length > 0;
if (exports.config.debug) {
    console.log("DEBUG");
}
console.log(JSON.stringify(exports.config, null, 2));
exports.config = exports.config;
//# sourceMappingURL=config.js.map