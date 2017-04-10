"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var Twitter = (function () {
    function Twitter() {
    }
    Twitter.asSocialMediaPosting = function (status) {
        var socialMediaPosting = new schema_1.SocialMediaPosting();
        socialMediaPosting.text = (status.text || "").trim();
        socialMediaPosting.setDateCreated(status.created_at.replace(/( \+)/, " UTC$1"));
        socialMediaPosting.creator = new schema_1.Person();
        socialMediaPosting.creator.name = "@" + status.user.screen_name;
        socialMediaPosting.creator.image = new schema_1.ImageObject();
        socialMediaPosting.creator.image.url = status.user.profile_image_url;
        socialMediaPosting.creator.url = "https://twitter.com/" + status.user.screen_name;
        socialMediaPosting.inLanguage = (status.lang || "").trim();
        if (status.entities.media && status.entities.media.length > 0) {
            var mediaItem = status.entities.media[0];
            if (mediaItem) {
                socialMediaPosting.setImage(mediaItem.media_url, mediaItem.sizes.medium.w, mediaItem.sizes.medium.h);
            }
        }
        var shareAction = new schema_1.InteractionCounter();
        shareAction.interactionType = "http://schema.org/ShareAction";
        shareAction.userInteractionCount = status.retweet_count;
        var likeAction = new schema_1.InteractionCounter();
        likeAction.interactionType = "http://schema.org/LikeAction";
        likeAction.userInteractionCount = status.favorite_count;
        socialMediaPosting.interactionStatistic = [
            shareAction,
            likeAction
        ];
        socialMediaPosting.url = "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str;
        socialMediaPosting.mentions = [];
        if (status.entities.user_mentions && status.entities.user_mentions.length > 0) {
            status.entities.user_mentions.forEach(function (user) {
                socialMediaPosting.mentions.push("@" + user.screen_name);
            });
        }
        if (status.entities.urls && status.entities.urls.length > 0) {
            socialMediaPosting.sharedContent = [];
            status.entities.urls.forEach(function (tco) {
                socialMediaPosting.sharedContent.push(tco.url);
            });
        }
        var keywords = [];
        if (status.entities.hashtags && status.entities.hashtags.length > 0) {
            status.entities.hashtags.forEach(function (hashtag) {
                keywords.push("#" + hashtag.text);
            });
        }
        if (status.entities.symbols && status.entities.symbols.length > 0) {
            status.entities.symbols.forEach(function (symbol) {
                keywords.push("$" + symbol.text);
            });
        }
        if (keywords.length > 0) {
            socialMediaPosting.keywords = keywords;
        }
        return socialMediaPosting;
    };
    return Twitter;
}());
exports.Twitter = Twitter;
//# sourceMappingURL=twitter.js.map