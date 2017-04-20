export class Twitter {
    consumer_key: string;
    consumer_secret: string;
    access_token: string;
    access_token_secret: string;
    timeout_ms: number;
}

export class Express {
    port: number;
}

export class Event {
    name: string;
    screen_names: string[];
    hashtags: string[];
}

export class Config {
    twitter: Twitter;
    express: Express;
    event: Event;
}


export const config: Config = {
    twitter: {
        consumer_key: "IANgkT1nd56vRlM6Qqu3Oxn2C",
        consumer_secret: "VyfZzl9YAAdNqHj12PRk1oX8EZXWnA58RIxjG2E1NOzhrERkPb",
        access_token: "29650035-O1mGOswJj3XeEsveSc8QW3Lz6mmYGvWWbZmPeAgXq",
        access_token_secret: "k79NwcMe1qzLBOXbyFLwo4373lI0KLKSBzoshhK5V8IOr",
        timeout_ms: 60000
    },

    express: {
        port: 3000
    },

    event: {
        name: "DevConf 2017",
        
        screen_names: [
            "@bbdsoftware",
            "@devconfza",
            "@mikegeyser",
            "@rorypreddy",
            "@rmaclean",
            "@williamBZA"
        ],
        hashtags: [
            "#bbdsoftware",
            "#DevConf",
            "#DevConfZA",
            "#DevConf2017",
            "#DevConfZA2017"
        ]
    }
}


// {
//   "twitter":{
//     "consumer_key": "IANgkT1nd56vRlM6Qqu3Oxn2C",
//     "consumer_secret": "VyfZzl9YAAdNqHj12PRk1oX8EZXWnA58RIxjG2E1NOzhrERkPb",
//     "access_token": "29650035-O1mGOswJj3XeEsveSc8QW3Lz6mmYGvWWbZmPeAgXq",
//     "access_token_secret": "k79NwcMe1qzLBOXbyFLwo4373lI0KLKSBzoshhK5V8IOr",
//     "timeout_ms": 60000
//   },
//   "express":{
//   "port": 3000
//   },
//   "event": {
//     "name": "DevConf 2017",
//     "start": 1470261600,
//     "end": 1470348000,
//     "screen_names":[
//       "@bbdsoftware",
//       "@devconfza",
//       "@mikegeyser",
//       "@rorypreddy",
//       "@rmaclean",
//       "@williamBZA"
//       ],
//     "hashtags":[
//       "#bbdsoftware",
//       "#DevConf",
//       "#DevConfZA",
//       "#DevConf2017",
//       "#DevConfZA2017"
//     ]
//   }
// }