// const config = require("config");
// const elasticsearch = require("elasticsearch");

// let client = new elasticsearch.Client({
//     host: config.elasticsearch.host,
//     log: config.elasticsearch.log
// });

// export class Indexer {
//     static index(thing, callback) {
//         client.index({
//             index: (config.elasticsearch.index || "default"),
//             type: (thing["type"] || "Thing").replace("http://schema.org/", ""),
//             id: (thing["url"] || ""),
//             body: thing
//         }, callback);
//     }
// }