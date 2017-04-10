"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Thing = (function () {
    function Thing() {
        this.type = "http://schema.org/Thing";
    }
    Thing.prototype.setImage = function (url, width, height) {
        if (width === void 0) { width = ""; }
        if (height === void 0) { height = ""; }
        if (url && url.length > 0) {
            this.image = new ImageObject();
            this.image.url = url;
            if (typeof width === "string" && width.length > 0) {
                try {
                    this.image.width = parseInt(width);
                }
                catch (e) {
                }
            }
            else if (typeof width === "number" && width > 0) {
                this.image.width = width;
            }
            if (typeof height === "string" && height.length > 0) {
                try {
                    this.image.height = parseInt(height);
                }
                catch (e) {
                }
            }
            else if (typeof height === "number" && height > 0) {
                this.image.height = height;
            }
        }
    };
    Thing.prototype.parseDate = function (date) {
        date = date || "";
        if (date.length > 0) {
            try {
                var parsedDate = new Date(date);
                if (parsedDate instanceof Date) {
                    if (isNaN(parsedDate.getTime())) {
                        date = "";
                    }
                    else {
                        date = parsedDate.toJSON();
                    }
                }
                else {
                    date = "";
                }
            }
            catch (e) {
                date = "";
            }
        }
        return date;
    };
    return Thing;
}());
exports.Thing = Thing;
var DataFeedItem = (function (_super) {
    __extends(DataFeedItem, _super);
    function DataFeedItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/DataFeedItem";
        return _this;
    }
    return DataFeedItem;
}(Thing));
exports.DataFeedItem = DataFeedItem;
var CreativeWork = (function (_super) {
    __extends(CreativeWork, _super);
    function CreativeWork() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/CreativeWork";
        return _this;
    }
    CreativeWork.prototype.setAuthor = function (name, url) {
        if (url === void 0) { url = ""; }
        if (name.length > 0) {
            this.author = new Person();
            this.author.name = name;
            if (url.length > 0) {
                this.author.url = url;
            }
        }
    };
    CreativeWork.prototype.setPublisher = function (url) {
        if (url.length > 0) {
            var publisher_url = require("url").parse(url);
            this.publisher = new Organization();
            this.publisher.name = (publisher_url.host || "").replace("www.", "").trim();
            this.publisher.url = publisher_url.protocol + "//" + publisher_url.host;
        }
    };
    CreativeWork.prototype.setDatePublished = function (date) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.datePublished = new Date(date);
        }
    };
    CreativeWork.prototype.setDateModified = function (date) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.dateModified = new Date(date);
        }
    };
    CreativeWork.prototype.setDateCreated = function (date) {
        date = this.parseDate(date);
        if (date.length > 0) {
            this.dateCreated = new Date(date);
        }
    };
    return CreativeWork;
}(Thing));
exports.CreativeWork = CreativeWork;
var DataSet = (function (_super) {
    __extends(DataSet, _super);
    function DataSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/DataSet";
        return _this;
    }
    return DataSet;
}(CreativeWork));
exports.DataSet = DataSet;
var DataFeed = (function (_super) {
    __extends(DataFeed, _super);
    function DataFeed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/DataFeed";
        return _this;
    }
    return DataFeed;
}(DataSet));
exports.DataFeed = DataFeed;
var MediaObject = (function (_super) {
    __extends(MediaObject, _super);
    function MediaObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/MediaObject";
        return _this;
    }
    return MediaObject;
}(CreativeWork));
exports.MediaObject = MediaObject;
var ImageObject = (function (_super) {
    __extends(ImageObject, _super);
    function ImageObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/ImageObject";
        return _this;
    }
    return ImageObject;
}(MediaObject));
exports.ImageObject = ImageObject;
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/Person";
        return _this;
    }
    return Person;
}(Thing));
exports.Person = Person;
var Organization = (function (_super) {
    __extends(Organization, _super);
    function Organization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/Organization";
        return _this;
    }
    return Organization;
}(Thing));
exports.Organization = Organization;
var Article = (function (_super) {
    __extends(Article, _super);
    function Article() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/Article";
        return _this;
    }
    return Article;
}(CreativeWork));
exports.Article = Article;
var SocialMediaPosting = (function (_super) {
    __extends(SocialMediaPosting, _super);
    function SocialMediaPosting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/SocialMediaPosting";
        return _this;
    }
    return SocialMediaPosting;
}(Article));
exports.SocialMediaPosting = SocialMediaPosting;
var InteractionCounter = (function (_super) {
    __extends(InteractionCounter, _super);
    function InteractionCounter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "http://schema.org/InteractionCounter";
        return _this;
    }
    return InteractionCounter;
}(Thing));
exports.InteractionCounter = InteractionCounter;
//# sourceMappingURL=schema.js.map