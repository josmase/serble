'use strict';

var tokens = require('./tokens.js');
var serble = require('./serble.js');
var bcrypt = require('bcryptjs');

var app = serble.objects.app;
var database = serble.objects.database;

// Constants
var USERNAME_LOWER_LIMIT = 4;
var USERNAME_UPPER_LIMIT = 45;
var PASSWORD_LOWER_LIMIT = 6;
var PASSWORD_UPPER_LIMIT = 45;
var EMAIL_UPPER_LIMIT = 45;

/**
 * Users module
 * @author Emil Bertillson, Serble
 * @version 2016-04-25
 */
var exp = {
    profile: {
        structure: {},

        /**
         * Filters a profile object
         * @param data Profile data
         * @param filter Filter hidden information
         */
        filter: function (data, filter) {
            var profile = data;
            delete profile.user_id;
            delete profile.profile_id;

            for (var key in profile) {
                var match = key.match("^show_(.+)");

                if (profile[key] === "null") {
                    delete profile[key];
                }

                if (match) {
                    profile[key] = Boolean(profile[key]);
                    if (!profile[key] && filter) {
                        profile[match[1]] = null;
                    }
                }
            }

            return profile;
        },

        /**
         * Verifies and filters a profile, returning eventual errors
         * @param data Profile data and settings
         */
        verify: function (data) {
            var result = {
                filtered: {},
                err: []
            };

            for (var dk in data) {
                if (data[dk] != null) {
                    for (var sk in this.structure) {
                        if (data[dk].length && dk === sk && !this.structure[sk].ignore) {
                            var err;

                            if (err = this.structure[sk].check(data[dk])) {
                                result.err.push(err);
                            } else {
                                result.filtered[dk] = data[dk];
                            }
                        } else if (dk === "show_" + sk) {
                            if (typeof data[dk] == "boolean") {
                                result.filtered[dk] = data[dk] ? 1 : 0;
                            }
                        }
                    }
                }
            }

            return result;
        }
    },

    /**
     * Updates the user profile
     * @param username Username
     * @param data Profile data
     * @param callback Callback
     */
    updateProfile: function (username, data, callback) {
        var err = [];

        if (!data) {
            err.push("nodata");
        }

        if (err.length > 0) {
            callback(err);
        } else {
            var verified = this.profile.verify(data);

            if (verified.err.length > 0) {
                callback(verified.err);
            } else {
                database.query("SELECT * FROM `account` WHERE ?", {username: username}, function (e, res) {
                    if (res.length <= 0) {
                        err.push("noaccount");
                        callback(err);
                    } else {
                        database.query("UPDATE `profile` SET ? WHERE `user_id` = "
                            + database.escape(res[0].user_id), verified.filtered, function (e, res) {
                            callback();
                        });
                    }
                });
            }
        }
    },

    /**
     * Gets a profile
     * @param username Username
     * @param id Profile ID
     * @param filter Use filter (True if the visitor is not the profile owner)
     * @param callback Callback
     */
    getProfile: function (username, id, filter, callback) {
        var err = [];

        if (username == null && id == null) {
            err.push("nouser");
        }

        if (err.length > 0) {
            callback(err);
            return;
        }

        var self = this;

        var options;

        if (username != null) {
            options = "`account`.`username` = " + database.escape(username);
        } else if (id != null) {
            options = "`profile`.`profile_id` = " + database.escape(id);
        }

        database.query("SELECT DISTINCT `account`.`username`, `profile`.* FROM `profile` INNER JOIN `account` ON `profile`.`user_id` = `account`.`user_id` WHERE " + options, function (e, res) {
            if (res.length <= 0) {
                err.push("noprofile");
                callback(err);
            } else {
                callback(null, self.profile.filter(res[0], filter));
            }
        });
    },

    /**
     * Attempts to log in and return token
     * @param credentials Username/Email
     * @param password Password
     * @param callback Callback
     */
    login: function (credentials, password, callback) {
        var err = [];

        if (!credentials) {
            err.push("nocredentials");
        }
        if (!password) {
            err.push("nopass");
        }

        if (err.length > 0) {
            callback(err);
            return;
        }

        var self = this;

        bcrypt.genSalt(10, function (e, salt) {
            bcrypt.hash(password, salt, function (e, hash) {
                var query = "SELECT DISTINCT t1.`user_id`, t1.`username`, t1.`password`, t2.`profile_id` FROM `account` AS t1 INNER JOIN `profile` AS t2 ON t1.`user_id` = t2.`user_id` WHERE t1.`username` = "
                    + database.escape(credentials)
                    + " OR t1.`email` = "
                    + database.escape(credentials);

                database.query(query, function (e, res) {
                    if (e) {
                        console.log("Database error: " + e);
                    } else {
                        if (res.length <= 0) {
                            err.push("noaccountorpassword");
                            callback(err);
                        } else {
                            bcrypt.compare(password, res[0].password, function (e, valid) {
                                if (valid) {
                                    callback(null, tokens.sign({
                                        username: res[0].username,
                                        user_id: res[0].user_id,
                                        profile_id: res[0].profile_id
                                    }), res[0].username);
                                } else {
                                    err.push("noaccountorpassword");
                                    callback(err);
                                }
                            });
                        }
                    }
                });
            });
        });
    },

    /**
     * Set profile image
     * @param id Profile ID
     * @param path Image path
     */
    setProfileImage: function (id, path) {
        database.query("SELECT `avatar_url` FROM `profile` WHERE ?", {profile_id: id}, function (e, res) {
            if (res && res[0] && res[0].avatar_url != null && res[0].avatar_url !== '/content/avatars/default.png') {
                serble.unlinkFiles([res[0].avatar_url], true);
            }
        });

        database.query("UPDATE `profile` SET `avatar_url` = " + database.escape(path) + " WHERE `profile_id` = " + database.escape(id));
    },

    /**
     * Registers a new account
     * @param username Username
     * @param password Password
     * @param email E-mail
     * @param ssn Social security number
     * @param callback Callback
     */
    register: function (username, password, email, ssn, callback) {
        var err = [];

        if (!username) {
            err.push("nouser");
        } else {
            if (username.length < USERNAME_LOWER_LIMIT) {
                err.push("usertooshort");
            } else if (username.length > USERNAME_UPPER_LIMIT) {
                err.push("usertoolong");
            }
        }
        if (!password) {
            err.push("nopass");
        } else {
            if (password.length < PASSWORD_LOWER_LIMIT) {
                err.push("passwordtooshort");
            } else if (password.length > PASSWORD_UPPER_LIMIT) {
                err.push("passwordtoolong");
            }
        }
        if (!email) {
            err.push("noemail");
        } else {
            var emailRgx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            if (!emailRgx.test(email)) {
                err.push("emailinvalid");
            } else if (email.length > EMAIL_UPPER_LIMIT) {
                err.push("emailtoolong");
            }
        }
        if (!ssn) {
            err.push("nossn");
        }

        if (err.length > 0) {
            callback(err);
            return;
        }

        var query = "SELECT `username`, `email`, `ssn` FROM `account` WHERE `username` = "
            + database.escape(username)
            + " OR `email` = "
            + database.escape(email)
            + " OR `ssn` = "
            + database.escape(ssn);

        database.query(query, function (e, res) {
            if (e) {
                console.log("Database error: " + e);
            } else {
                if (res.length > 0) {
                    if (res[0].username.toLowerCase() === username.toLowerCase()) {
                        err.push("userexists");
                    }
                    if (res[0].email.toLowerCase() === email.toLowerCase()) {
                        err.push("emailexists");
                    }
                    if (res[0].ssn.toString().toLowerCase() === ssn.toString().toLowerCase()) {
                        err.push("ssnexists");
                    }


                    callback(err);
                } else {
                    bcrypt.genSalt(10, function (e, salt) {
                        bcrypt.hash(password, salt, function (e, hash) {
                            var options = {
                                group_id: 1,
                                username: username,
                                password: hash,
                                email: email.toLowerCase(),
                                ssn: ssn
                            };

                            database.query("INSERT INTO `account` SET ?", options, function (e, res) {
                                if (e) {
                                    console.log("Database error: " + e);
                                } else {
                                    callback();

                                    var options = {
                                        user_id: res.insertId,
                                        firstname: username,
                                        email: email.toLowerCase()
                                    };

                                    database.query("INSERT INTO `profile` SET ?", options, function (e) {
                                        if (e) {
                                            console.log("Database error: " + e);
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            }
        });
    }
};

// Profile structure setup

exp.profile.structure = {
    user_id: {
        ignore: true
    },

    profile_id: {
        ignore: true
    },

    firstname: {
        ignore: false,
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "firstnametoolong";
                }
            } else {
                return "firstnameinvalid";
            }
        }
    },

    lastname: {
        ignore: false,
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "lastnametoolong";
                }
            } else {
                return "lastnameinvalid";
            }
        }
    },

    city: {
        ignore: false,
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

    phone: {
        ignore: false,
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "phonetoolong";
                }
            } else {
                return "phoneinvalid";
            }
        }
    },

    address: {
        ignore: false,
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "addresstoolong";
                }
            } else {
                return "addressinvalid";
            }
        }
    },

    description: {
        ignore: false,
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

    avatar_url: {
        ignore: true
    }
};

module.exports = exp;
