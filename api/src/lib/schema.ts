export class Thing {
    type: string = "http://schema.org/Thing";
    description: string;
    image: ImageObject;
    name: string;
    url: string;
    sameAs: string[];
    mentions: string[];

    setImage(url: string, width: string|number = "", height: string|number = "") {
        if (url && url.length > 0) {
            this.image = new ImageObject();
            this.image.url = url;

            if (typeof width === "string" && width.length > 0) {
                try {
                    this.image.width = parseInt(width);
                } catch(e) {

                }
            } else if (typeof width === "number" && width > 0) {
                this.image.width = width;
            }

            if (typeof height === "string" && height.length > 0) {
                try {
                    this.image.height = parseInt(height);
                } catch(e) {

                }
            } else if (typeof height === "number" && height > 0) {
                this.image.height = height;
            }
        }
    }

    parseDate(date: string) : string {
        date = date || "";

        if (date.length > 0) {
            try {
                let parsedDate = new Date(date);
                if (parsedDate instanceof Date) {
                    if (isNaN(parsedDate.getTime())) {
                        date = "";
                    } else {
                        date = parsedDate.toJSON();
                    }
                } else {
                    date = "";
                }
            } catch(e){
                date = "";
            }
        }

        return date;        
    }
}

export class DataFeedItem extends Thing {
    type: string = "http://schema.org/DataFeedItem";
    dateCreated: Date;
    dateModified: Date;
    dateDeleted: Date;
    item: Thing;
}

export class CreativeWork extends Thing {
    type: string = "http://schema.org/CreativeWork";
    dateCreated: Date;
    dateModified: Date;
    datePublished: Date;
    headline: string;
    inLanguage: string;
    keywords: string[];
    text: string;
    author: Person | Organization;
    creator: Person;
    publisher: Organization;
    interactionStatistic: InteractionCounter[];

    setAuthor(name: string, url: string = "") {
        if (name.length > 0) {
            this.author = new Person();
            this.author.name = name;

            if (url.length > 0) {
                this.author.url = url;
            }
        }
    }

    setPublisher(url: string) {
        if (url.length > 0) {
            let publisher_url = require("url").parse(url);

            this.publisher = new Organization();
            this.publisher.name = (publisher_url.host || "").replace("www.", "").trim();
            this.publisher.url = publisher_url.protocol + "//" + publisher_url.host;
        }
    }

    setDatePublished(date: string) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.datePublished = new Date(date);
        }
    }
    setDateModified(date: string) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.dateModified = new Date(date);
        }
    }
    setDateCreated(date: string) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.dateCreated = new Date(date);
        }
    }
}

export class DataSet extends CreativeWork {
    type: string = "http://schema.org/DataSet";
}

export class DataFeed extends DataSet {
    type: string = "http://schema.org/DataFeed";
    dataFeedElement: Thing[];
    max_id: string;
    since_id: string;
}

export class MediaObject extends CreativeWork {
    type: string = "http://schema.org/MediaObject";
    contentUrl: string;
    embedUrl: string;
    height: number;
    uploadDate: Date;
    width: number;
}

export class ImageObject extends MediaObject {
    type: string = "http://schema.org/ImageObject";
    caption: string;
}

export class Person extends Thing {
    type: string = "http://schema.org/Person";
}

export class Organization extends Thing {
    type: string = "http://schema.org/Organization";
    logo: ImageObject;
}

export class Article extends CreativeWork {
    type: string = "http://schema.org/Article";
    articleSection: string;
    articleBody: string;
}

export class SocialMediaPosting extends Article {
    type: string = "http://schema.org/SocialMediaPosting";
    sharedContent: string[];
}

export class InteractionCounter extends Thing {
    type: string = "http://schema.org/InteractionCounter";
    interactionType: string;
    userInteractionCount: number;
}