'use strict';

var log = require('log-util');

var app, db;

/**
 * Articles (Advertisements) module
 * @author Emil Bertillson, Serble
 * @version 2016-01-28
 */
var exp = {
  /**
   * Instantiates a new article object
   * @param author Author profile ID
   * @param title Article title
   * @param category Category
   * @param description Description
   * @param payout Job payout
   * @param location Location
   * @constructor
   */
  Article: function (author, title, category, description, payout, location) {
    this.id = null;
    this.author = author || "Unknown";
    this.title = title || "Unknown";
    this.description = description || "Unknown";
    this.payout = payout || 0;
    this.location = location || {lat: 0, long: 0};
  },

  ArticleRequestObject: function (req) {
    this.id = req.id || null;
    this.filterName = req.filterName || null;
    this.filterCategory = req.filterCategory || null;
    this.loc = {lat: null, long: null};
    this.radius = req.radius || null;
    this.range = [0, 0];

    if (req.loc && req.loc.lat && req.loc.long) {
      this.loc = req.loc;
    }

    if (req.range && typeof req.range == "array") {
      this.range = req.range;
    }
  },

  ArticlePostObject: function (req) {
    this.valid = true;
    this.title = req.title || null;
    this.description = req.description || null;
    this.payout = req.payout || 0;
    this.category = req.category || "Unspecified";
    this.loc = {lat: 0, long: 0};
    this.stage = req.stage || 0;

    if (!req.author) {
      this.valid = false;
      this.author = 1;
    } else {
      this.author = req.author;
    }

    if (req.loc && req.loc.lat && req.loc.long) {
      this.loc = req.loc;
    }
  },

  /**
   * Gets all articles based on request
   * @param req Article request object
   */
  getArticles: function (req, callback) {
    var res = [];

    var qstring = 'SELECT * FROM `advertisement`';
    var options = {};

    if (req.id) {
      options.advert_id = req.id;
    } else if (req.filterTitle) {
      qstring += ' WHERE `title` LIKE ' + db.escape('%' + req.filterTitle + '%');
    } else if (req.filterCategory) {
      qstring += ' WHERE `category` LIKE ' + db.escape('%' + req.filterCategory + '%');
    }

    console.log(qstring);

    var query = db.query(qstring, options, function (err, result) {
      if (err) {
        console.log("Database error: " + err);
        callback();
      } else {
        result.forEach(function (entry) {
          res.push({
            id: entry.advert_id,
            author: entry.author_id,
            title: entry.title,
            description: entry.description,
            payout: entry.payout,
            loc: {lat: entry.location_lat, long: entry.location_long}
          });
        });

        callback(res);
      }
    });
  },

  /**
   *
   * @param req
   */
  postArticle: function (req) {
    var options = {
      author_id: req.author,
      title: req.title,
      description: req.description,
      payout: req.payout,
      category: req.category,
      location_lat: req.loc.lat,
      location_long: req.loc.long,
      stage: req.stage
    };

    var query = db.query('INSERT INTO `advertisement` SET ?', options, function (err, result) {
      if (err) {
        console.log("Database error: " + err);
      }
    });
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
    console.log(req.query);
    var reqData = new exp.ArticleRequestObject(req.query);
    var data = exp.getArticles(reqData, function (data) {
      res.json(data);
    });
  });

  app.post('/articles/create', function (req, res) {
    var postData = new exp.ArticlePostObject(req.body);
    var result = exp.postArticle(postData);
    res.json({fisk:"mås"});
  });
}


module.exports = exp;