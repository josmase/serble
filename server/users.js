'use strict';

var serble = require('./serble.js');
var tokens = require('./tokens.js');
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
 * @version 2016-02-17
 */
var exp = {
    /**
     * Filters a profile based on settings
     * @param data
     */
    filterProfile: function (data) {
        var profile = data;
        delete profile.user_id;
        delete profile.profile_id;

        for (var key in profile) {
            var match = key.match("^show_(.+)");

            if (!profile[key] && match) {
                profile[match[1]] = null;
            }
        }

        return profile;
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
            return;
        }
    },

    /**
     * Fetches a profile based on username
     * @param username Username
     * @param callback Callback
     */
    fetchProfile: function (username, callback) {
        var err = [];

        if (!username) {
            err.push("nouser");
        }

        if (err.length > 0) {
            callback(err);
            return;
        }

        var self = this;

        var options = {
            username: username
        };

        database.query("SELECT `user_id` FROM `account` WHERE ?", options, function (e, res) {
            if (e) {
                console.log("Database error: " + e);
            } else {
                if (res.length <= 0) {
                    err.push("noaccount");
                    callback(err);
                } else {
                    var options = {
                        user_id: res[0].user_id
                    };

                    database.query("SELECT * FROM `profile` WHERE ?", options, function (e, res) {
                        if (res.length <= 0) {
                            err.push("noprofile");
                            callback(err);
                        } else {
                            callback(null, self.filterProfile(res[0]));
                        }
                    });
                }
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
                var query = "SELECT `username`, `password` FROM `account` WHERE `username` = "
                    + database.escape(credentials)
                    + " OR `email` = "
                    + database.escape(credentials);

                database.query(query, function (e, res) {
                    if (e) {
                        console.log("Database error: " + e);
                    } else {
                        if (res.length <= 0) {
                            err.push("noaccount");
                            callback(err);
                        } else {
                            bcrypt.compare(password, res[0].password, function (e, valid) {
                                if (valid) {
                                    callback(null, tokens.sign({username: res[0].username}), res[0].username);
                                } else {
                                    err.push("passwordinvalid");
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

app.post('/user/profile/update', function (req, res) {
    console.log("Update profile request:");
    console.log(req.body);

    tokens.tryUnlock(req.body.token, function (data) {
        if (data.username) {
            exp.updateProfile(data.username, req.body.data, function (e) {
            });
        } else {
            res.json({success: false, err: ["tokenerror"]});
        }
    }, function () {
        res.json({success: false, err: ["tokeninvalid"]});
    });

    console.log();
});

app.get('/user/profile/get', function (req, res) {
    console.log("Get profile request:");
    console.log(req.query);
    exp.fetchProfile(req.query.username, function (e, profile) {
        if (e) {
            console.log("Get profile request failed: " + e);
            res.json({success: false, err: e});
        } else {
            console.log("Get profile request succesful! User: " + req.query.username);
            res.json({success: true, result: profile});
        }
    });
    console.log();
});

app.post('/user/login', function (req, res) {
    console.log("Login request:");
    console.log(req.body);
    exp.login(req.body.credentials, req.body.password, function (e, token, username) {
        if (e) {
            console.log("Login request failed: " + e);
            res.json({success: false, err: e});
        } else {
            console.log("Login request succesful! Token: " + token);
            res.json({success: true, result: token, username: username});
        }
    });
    console.log();
});

app.post('/user/register', function (req, res) {
    console.log("Register request:");
    console.log(req.body);
    exp.register(req.body.username, req.body.password, req.body.email, req.body.ssn, function (e) {
        if (e) {
            console.log("Register request failed: " + e);
            res.json({success: false, err: e});
        } else {
            console.log("Register request succesful!");
            res.json({success: true});
        }
    });
    console.log();
});

module.exports = exp;
