'use strict';

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
 * @version 2016-01-28
 */
var exp = {
    /**
     * Attempts to log in and return token
     * @param username Username/Email
     * @param password Password
     * @param callback Callback
     */
    login: function (username, password, callback) {
        var err = [];

        if (!username) {
            err.push("nouser");
        }
        if (!password) {
            err.push("nopass");
        }

        if (err.length > 0) {
            callback(err);
            return;
        }

        bcrypt.genSalt(10, function (e, salt) {
            bcrypt.hash(password, salt, function (e, hash) {
                var query = "SELECT `password` FROM `account` WHERE `username` = "
                    + database.escape(username)
                    + " OR `email` = "
                    + database.escape(username);

                database.query(query, function (e, res) {
                    if (res.length <= 0) {
                        err.push("noaccount");
                        callback(err);
                    } else {
                        bcrypt.compare(password, res[0].password, function (e, res) {
                            if (res) {
                                callback(null, "grisskrik");
                            } else {
                                err.push("passwordinvalid");
                                callback(err);
                            }
                        });
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
            if (email.length > EMAIL_UPPER_LIMIT) {
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

        var query = "SELECT `user_id` FROM `account` WHERE `username` = "
            + database.escape(username)
            + " OR `email` = "
            + database.escape(email);

        database.query(query, function (e, res) {
            if (res.length > 0) {
                err.push("alreadyexists");
                callback(err);
                return;
            } else {
                bcrypt.genSalt(10, function (e, salt) {
                    bcrypt.hash(password, salt, function (e, hash) {
                        var options = {
                            group_id: 1,
                            username: username,
                            password: hash,
                            email: email,
                            ssn: ssn
                        };

                        database.query("INSERT INTO `account` SET ?", options, function (e) {
                            if (e) {
                                console.log("Database error: " + e);
                            } else {
                                callback();
                            }
                        });
                    });
                });
            }
        });
    }
};

exp.login("fisk", "fiskmås", function (e, token) {
});

app.get('/user/login', function (req, res) {
    exp.login(req.query.username, req.query.password, function (e) {
    });
});

app.post('/user/register', function (req, res) {
    console.log("Register request started: " + req.body);
    exp.register(req.body.username, req.body.password, req.body.email, req.body.ssn, function (e) {
        res.json(e);

        if (e) {
            console.log("Register request failed! Errors: " + e);
        } else {
            console.log("Register request succesful!");
        }
    });
});

module.exports = exp;
