import { DataFeed, SocialMediaPosting, Person, ImageObject, InteractionCounter } from "./schema";

export class Twitter {
    static asSocialMediaPosting(status: any): SocialMediaPosting {
        let socialMediaPosting = new SocialMediaPosting();
        socialMediaPosting.text = (status.text || "").trim();

        socialMediaPosting.setDateCreated(status.created_at.replace(/( \+)/, " UTC$1"));

        socialMediaPosting.creator = new Person();
        socialMediaPosting.creator.name = "@" + status.user.screen_name;
        socialMediaPosting.creator.image = new ImageObject();
        socialMediaPosting.creator.image.url = status.user.profile_image_url;
        socialMediaPosting.creator.url = "https://twitter.com/" + status.user.screen_name;

        socialMediaPosting.inLanguage = (status.lang || "").trim();

        if (status.entities.media && status.entities.media.length > 0) {
            let mediaItem = status.entities.media[0];
            if (mediaItem) {
                socialMediaPosting.setImage(mediaItem.media_url, mediaItem.sizes.medium.w, mediaItem.sizes.medium.h);
            }
        }

        let shareAction = new InteractionCounter();
        shareAction.interactionType = "http://schema.org/ShareAction";
        shareAction.userInteractionCount = status.retweet_count;

        let likeAction = new InteractionCounter();
        likeAction.interactionType = "http://schema.org/LikeAction";
        likeAction.userInteractionCount = status.favorite_count;

        socialMediaPosting.interactionStatistic = [
            shareAction,
            likeAction
        ];

        socialMediaPosting.url = "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str;

        socialMediaPosting.mentions = [];
        if (status.entities.user_mentions && status.entities.user_mentions.length > 0) {
            status.entities.user_mentions.forEach(user => {
                socialMediaPosting.mentions.push("@" + user.screen_name);
                // socialMediaPosting.articleBody = socialMediaPosting.articleBody.replace("@" + user.screen_name, "<strong class=\"twitter-mention\">" + "@" + user.screen_name + "</strong>"); 
            });
        }

        if (status.entities.urls && status.entities.urls.length > 0) {
            socialMediaPosting.sharedContent = [];
            status.entities.urls.forEach((tco) => {
                socialMediaPosting.sharedContent.push(tco.url);
                // socialMediaPosting.articleBody = socialMediaPosting.articleBody.replace(tco.url, "<a class=\"link\" href=\"" + tco.url + "\">" + tco.url + "</a>");
            });
        }

        let keywords = [];

        if (status.entities.hashtags && status.entities.hashtags.length > 0) {
            status.entities.hashtags.forEach(function (hashtag) {
                keywords.push("#" + hashtag.text);
                // socialMediaPosting.articleBody = socialMediaPosting.articleBody.replace("#" + hashtag.text, "<strong class=\"PrettyLink hashtag\"><span class=\"PrettyLink-prefix\">#</span><span class=\"PrettyLink-value\">" + hashtag.text + "</span></strong>"); 
            });
        }

        if (status.entities.symbols && status.entities.symbols.length > 0) {
            status.entities.symbols.forEach(function (symbol) {
                keywords.push("$" + symbol.text);
                // socialMediaPosting.articleBody = socialMediaPosting.articleBody.replace("$" + symbol.text, "<strong class=\"PrettyLink hashtag\"><span class=\"PrettyLink-prefix\">$</span><span class=\"PrettyLink-value\">" + symbol.text + "</span></strong>"); 
            });
        }

        if (keywords.length > 0) {
            socialMediaPosting.keywords = keywords;
        }

        return socialMediaPosting;
    }
}