'use strict';

var net = require('./net.js');

/**
 * Articles (Advertisements) module
 * @author Emil Bertillson, Serble
 * @version 2016-01-26
 */
var exp = {
    /**
     * Instantiates a new article object
     * @param author Author profile
     * @param title Article title
     * @param description Description
     * @param payout Job payout
     * @param location Location
     * @constructor
     */
    Article: function (author, title, description, payout, location) {
        this.author = author || "Unknown";
        this.title = title || "Unknown";
        this.description = description || "Unknown";
        this.payout = payout || 0;
        this.location = location || {lat: 0, long: 0};
    },

    /**
     * Gets all articles in a radius around the location
     * @param loc Location
     * @param radius Radius
     */
    get: function (loc, radius) {
    },

    /**
     * Posts and submits an article object to the database
     * @param db Database-object
     * @param article Article-object
     */
    post: function (db, article) {
    },

    /**
     * Streams articles to a client
     * @param res Resource-object
     * @param articles Articles
     */
    send: function (res, articles) {
        net.send(res, 'articles', articles);
    }
};

module.exports = exp;