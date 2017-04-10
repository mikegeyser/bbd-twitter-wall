'use strict';

var query = {
  "size": 10000,
  "query": {
    "match_all": {}
  }
};

const config = require("config");
const elasticsearch = require("elasticsearch");

let client = new elasticsearch.Client({
    host: config.elasticsearch.host,
    log: config.elasticsearch.log
});

client.search({
    index: (config.elasticsearch.index || "default"),
    body: query
}, function(err,response){
    let tweets = response.hits.hits.map((hit => hit._source));
    console.log(tweets.length);
    tweets = tweets.filter((tweet) => !tweet.text.startsWith("RT"))
    // tweets = tweets.filter((tweet) => {        
    //     return config.event.speakers.filter((speaker) => speaker == tweet.key ).length > 0;
    // });
    let map = {};
    config.event.speakers.forEach((speaker) => {
        map[speaker.toLowerCase()] = 0;
    });

    
    tweets.forEach((status) => {
        status.mentions.map(user => user.toLowerCase().substr(1)).forEach((user) => {
            console.log(user);
try {
    if (map[user] >= 0) {
    map[user] = map[user] + 1;
    }
} catch (error) {
    
}

            // if (map[user]) {
            //     map[user] = map[user] + 1;                
            //     //map[user]++;
            // }
        })
    })
    console.log(map);
});
