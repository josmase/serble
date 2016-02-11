'use strict';

var app, db;

/**
 * Articles (Advertisements) module
 * @author Emil Bertillson, Serble
 * @version 2016-01-28
 */
var exp = {
    /**
     * Instantiates a new article object
     * @param id ID
     * @param author_id Author profile ID
     * @param title Article title
     * @param category Category
     * @param description Description
     * @param payout Job payout
     * @param latitude Latitude
     * @param longitude Longitude
     * @param zipcode ZIP-code
     * @param neighborhood Neighborhood (Area)
     * @param type Article type
     * @constructor
     */
    Article: function (id, author_id, title, category, description, payout, latitude, longitude, zipcode, neighborhood, type) {
        this.id = id || null;
        this.author_id = author_id || 0;
        this.title = title || "Unknown";
        this.description = description || "Unknown";
        this.category = category || "Unknown";
        this.payout = payout || 0;
        this.latitude = latitude || 0;
        this.longitude = longitude || 0;
        this.zipcode = zipcode || 0;
        this.neighborhood = neighborhood || "Unknown";
        this.type = type || 1;
    },

    /**
     * Instantiates a new request object
     * @param req Client request data
     * @constructor
     */
    ArticleRequestObject: function (req) {
        this.id = req.id || null;
        this.filterTitle = req.filterTitle || null;
        this.filterCategory = req.filterCategory || null;
        this.type = req.type || null;
        this.latitude = req.latitude || null;
        this.longitude = req.longitude || null;
        this.zipcode = req.zipcode || null;
        this.neighborhood = req.neighborhood || null;
        this.radius = req.radius || null;
        this.range = req.range || null;
    },

    /**
     * Instantiates a new post object
     * @param req Client request data
     * @constructor
     */
    ArticlePostObject: function (req) {
        this.valid = true;
        this.title = req.title || null;
        this.description = req.description || null;
        this.payout = req.payout || 0;
        this.category = req.category || "Unspecified";
        this.latitude = req.latitude || 0;
        this.longitude = req.longitude || 0;
        this.zipcode = req.zipcode || 0;
        this.neighborhood = req.neighborhood || "Unspecified";
        this.type = req.type || 1;
        this.stage = req.stage || 0;

        if (!req.author) {
            this.valid = false;
            this.author = 1;
        } else {
            this.author = req.author;
        }
    },

    /**
     * Gets all articles based on request
     * @param req Article request object
     * @param callback Callback
     */
    getArticles: function (req, callback) {
        var res = [];

        var qstring = 'SELECT * FROM `advertisement` WHERE `advert_id` > 0 ';

        if (req.id) {
            options.advert_id = req.id;
        } else if (req.filterTitle && req.filterCategory) {
            qstring += ' AND `title` LIKE ' + db.escape('%' + req.filterTitle + '%')
                + ' AND `category` LIKE ' + db.escape('%' + req.filterCategory + '%');
        } else if (req.filterTitle) {
            qstring += ' AND `title` LIKE ' + db.escape('%' + req.filterTitle + '%');
        } else if (req.filterCategory) {
            qstring += ' AND `category` LIKE ' + db.escape('%' + req.filterCategory + '%');
        } else if (req.zipcode) {
            qstring += ' AND `zipcode` = ' + db.escape(req.zipcode);
        } else if (req.neighborhood) {
            qstring += ' AND `neighborhood` = ' + db.escape(req.neighborhood);
        }

        if (req.type) {
            qstring += ' AND `type` = ' + Number(req.type);
        }

        if (req.range) {
            qstring += ' LIMIT ' + Number(req.range[0]) + ', ' + Number(req.range[1]);
        }

        console.log(qstring);

        var query = db.query(qstring, null, function (err, result) {
            if (err) {
                console.log("Database error: " + err);
                callback();
            } else {
                result.forEach(function (entry) {
                    res.push(new exp.Article(
                        entry.advert_id,
                        entry.author_id,
                        entry.title,
                        entry.category,
                        entry.description,
                        entry.payout,
                        entry.location_lat,
                        entry.location_long,
                        entry.zipcode,
                        entry.neighborhood,
                        entry.type
                    ));
                });

                callback(res);
            }
        });
    },

    /**
     * Posts an article to the database
     * @param req Request data
     */
    postArticle: function (req) {
        var result = {};

        if (!req.author
            || !req.title
            || !req.description
            || !req.payout
            || !req.category
            || !req.type) {
            result.err = "Insufficient information, did you fill in all fields?";
        } else {
            var options = {
                author_id: req.author,
                title: req.title,
                description: req.description,
                payout: req.payout,
                category: req.category,
                location_lat: req.latitude,
                location_long: req.longitude,
                zipcode: req.zipcode,
                neighborhood: req.neighborhood,
                type: req.type,
                stage: req.stage
            };

            var query = db.query('INSERT INTO `advertisement` SET ?', options, function (err, result) {
                if (err) {
                    console.log("Database error: " + err);
                    result.err = "Internal database error";
                }
            });
        }

        return result;
    },

    /**
     * Sets the app and database object
     * @param appObj App object
     * @param dbObj Database object
     */
    use: function (appObj, dbObj) {
        app = appObj;
        db = dbObj;

        initialize();
    }
};

var initialize = function () {
    // Responds to article requests
    app.get('/articles/get', function (req, res) {
        var reqData = new exp.ArticleRequestObject(req.query);
        var data = exp.getArticles(reqData, function (data) {
            res.json(data);
        });
    });

    app.post('/articles/create', function (req, res) {
        var postData = new exp.ArticlePostObject(req.body);
        var result = exp.postArticle(postData);
        res.json(result);
    });
}


module.exports = exp;
