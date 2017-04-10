import * as config from 'config';

const speakers = config.event.speakers.map((speaker) => speaker.toLowerCase());

const elasticsearch = require("elasticsearch");
let client = new elasticsearch.Client({
    host: config.elasticsearch.host,
    log: config.elasticsearch.log
});

let router = require("express").Router();

router.get("/summary", (req, res) => {
    client.search({
        "index": config.elasticsearch.index,
        "body": {
            "size": 50,
            "sort": [
                {
                    "dateCreated": {
                        "order": "desc"
                    }
                }
            ],
            "query": {
                "match_all": {}
            },
            "aggs": {
                "trending_creators": {
                    "terms": {
                        "field": "creator.name",
                        "size": 5
                    }
                },
                "trending_mentions": {
                    "terms": {
                        "field": "mentions",
                        "size": 5
                    }
                },
                "trending_keywords": {
                    "terms": {
                        "field": "keywords",
                        "size": 5
                    }
                }
            }
        }
    }, function (error, response) {
        if (error) {
            res.status(500);
            res.end();
        } else {
            res.json({
                count: response.hits.total,
                latest: response.hits.hits.map((hit) => {
                    var status = hit._source;
                    return status;
                }),
                trending: {
                    keywords: response.aggregations.trending_keywords.buckets.map((bucket) => {
                        return {
                            keyword: bucket.key,
                            count: bucket.doc_count
                        };
                    }),
                    creators: response.aggregations.trending_creators.buckets.map((bucket) => {
                        return {
                            keyword: bucket.key,
                            count: bucket.doc_count
                        };
                    }),
                    mentions: response.aggregations.trending_mentions.buckets.map((bucket) => {
                        return {
                            keyword: bucket.key,
                            count: bucket.doc_count
                        };
                    })
                }
            });
        }
    });
});

router.get("/totals", (req, res) => {
    client.search({
        "index": config.elasticsearch.index,
        "body": {
            "size": 0,
            "query": {
                "filtered": {
                    "query": {
                        "query_string": {
                            "query": "*",
                            "analyze_wildcard": true
                        }
                    }
                }
            },
            "aggs": {
                "speakers": {
                    "terms": {
                        "field": "mentions",
                        "size": 20,
                        "order": {
                            "_count": "desc"
                        }
                    }
                }
            }
        }
    }, function (error, response) {
        if (error) {
            res.status(500);
            res.end();
        } else {
            console.log(JSON.stringify(response.aggregations));
            let aggregations = response.aggregations.speakers.buckets.filter((item) => {
                return speakers.filter((speaker) => speaker == item.key).length > 0;
            });
            console.log(JSON.stringify(aggregations));
            res.json({
                count: response.hits.total,
                aggregations: aggregations
            })
        }
    });
});

module.exports = router;
