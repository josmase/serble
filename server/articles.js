'use strict';

var serble = require('./serble.js');

var app = serble.objects.app;
var database = serble.objects.database;

/**
 * Articles module
 * @author Emil Bertillson, Serble
 * @version 2016-02-19
 */
var exp = {
    structure: {},

    /**
     * Verifies user input
     * @param data Data
     */
    verify: function (data) {
        var result = {
            filtered: {},
            err: []
        };

        for (var sk in this.structure) {
            if (!this.structure[sk].ignore) {
                var exists = false;

                for (var dk in data) {
                    if (dk === sk) {
                        exists = true;

                        var err;

                        if (this.structure[sk].type && typeof data[dk] != this.structure[sk].type) {
                            result.err.push(sk + "invalidtype");
                        } else if (typeof this.structure[sk].check == "function" && (err = this.structure[sk].check(data[dk]))) {
                            result.err.push(err);
                        } else {
                            result.filtered[dk] = data[dk];
                        }
                    }
                }

                if (!exists) {
                    result.err.push("no" + sk);
                }
            }
        }

        return result;
    },

    /**
     * Posts an article to the database
     * @param token Token data
     * @param data Article data
     * @param callback Callback
     */
    postArticle: function (token, data, callback) {
        var err = [];

        if (!data) {
            err.push("nodata");
        }

        if (err.length > 0) {
            callback(err);
        } else {
            var verified = this.verify(data);

            if (verified.err.length > 0) {
                callback(verified.err);
            } else {
                var sqldata = verified.filtered;
                sqldata.author_id = token.profile_id;
                database.query("INSERT INTO `advertisement` SET ?, `date_creation` = NOW()", sqldata, function (e) {
                    if (e) {
                        console.log("Database error: " + e);
                    } else {
                        callback();
                    }
                });
            }
        }
    },

    /**
     * Retrieves articles
     * @param filter
     * @param callback
     */
    getArticles: function (filter, callback) {
        var self = this;
        var query = "SELECT * FROM `advertisement` WHERE `author_id` > 0";

        if (filter && typeof filter == "object") {
            var range;

            for (var key in filter) {
                if (key == "range") {
                    range = filter[key];
                    delete filter[key];
                } else if (filter[key].value) {
                    if (filter[key].strict === false) {
                        query += " AND `" + key.replace("\\", '').replace('`', '') + "` = " + database.escape(filter[key].value);
                    } else {
                        query += " AND `" + key.replace("\\", '').replace('`', '') + "` LIKE(" + database.escape("%" + filter[key].value + "%") + ")";
                    }
                }
            }

            if (range) {
                query += " LIMIT " + range;
            }
        }

        console.log(query);

        database.query(query, function (e, res) {
            if (e) {
                console.log("Database error: " + e);
                callback(["dberror"]);
            } else {
                var result = [];

                if (res) {
                    res.forEach(function (entry) {
                        var obj = {};

                        for (var key in entry) {
                            obj[key] = entry[key];
                        }

                        if (!entry.archived) {
                            result.push(obj);
                        }
                    });
                }

                callback(null, result);
            }
        });
    },

    /**
     * Removes an article
     * @param id Article ID
     * @param callback Callback
     */
    removeArticle: function (id, callback) {
        var err = [];

        if (!id) {
            err.push("noid");
        }

        if (err.length > 0) {
            callback(err);
        } else {
            database.query("DELETE FROM `advertisement` WHERE ?", {advert_id: id}, function (e) {
                if (e) {
                    console.log("Database error: " + e);
                    callback(["dberror"]);
                } else {
                    callback();
                }
            });
        }
    }
};

// Article structure

exp.structure = {
    advert_id: {
        ignore: true
    },

    author_id: {
        ignore: true
    },

    title: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length && typeof val == "string") {
                if (val.length > 45) {
                    return "titletoolong";
                } else if (val.length < 6) {
                    return "titletooshort";
                }
            } else {
                return "titleinvalid";
            }
        }
    },

    description: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length) {
                if (val.length > 2048) {
                    return "descriptiontoolong";
                }
            } else {
                return "descriptioninvalid";
            }
        }
    },

    price: {
        ignore: false,
        type: "number",
        check: function (val) {
            if (val < 0) {
                return "pricebelowzero";
            }
        }
    },

    category: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "categorytoolong";
                }
            } else {
                return "categoryinvalid";
            }
        }
    },

    contact: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "contacttoolong";
                }
            } else {
                return "contactinvalid";
            }
        }
    },

    latitude: {
        type: "number"
    },

    longitude: {
        type: "number"
    },

    zipcode: {
        type: "number"
    },

    neighborhood: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "neighborhoodtoolong";
                }
            } else {
                return "neighborhoodinvalid";
            }
        }
    },

    city: {
        ignore: false,
        type: "string",
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "citytoolong";
                }
            } else {
                return "cityinvalid";
            }
        }
    },

    type: {
        ignore: false,
        type: "number",
        check: function (val) {
            if (val < 0 || val > 1) {
                return "typeinvalid";
            }
        }
    }
};

module.exports = exp;