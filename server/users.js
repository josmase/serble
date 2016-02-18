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
    profile: {
        structure: {},

        filter: function (data) {
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

        verify: function (data) {
            var result = {
                filtered: {},
                err: []
            };

            for (var dk in data) {
                if (data[dk] && data[dk].length) {
                    for (var sk in this.structure) {
                        if (dk === sk && !this.structure[sk].ignore) {
                            var err;

                            if (err = this.structure[sk].check(data[dk])) {
                                result.err.push(err);
                            } else {
                                result.filtered[dk] = data[dk];
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
                            + database.escape(res[0].user_id), verified.filtered, function (e) {
                        });
                    }
                });
            }
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
                            callback(null, self.profile.filter(res[0]));
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
                if (val.length > 255) {
                    return "descriptiontoolong";
                }
            } else {
                return "descriptioninvalid";
            }
        }
    },

    avatar_url: {
        ignore: false,
        check: function (val) {
            if (val.length) {
                if (val.length > 45) {
                    return "avatartoolong";
                }
            } else {
                return "avatarinvalid";
            }
        }
    }
};

app.post('/user/profile/update', function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.username) {
            exp.updateProfile(data.username, req.body.data, function (e) {
                if (e) {
                    res.json({success: false, err: e});
                } else {
                    res.json({success: true});
                }
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
    exp.fetchProfile(req.query.username, function (e, profile) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            res.json({success: true, result: profile});
        }
    });
    console.log();
});

// HTTP Request handling

app.post('/user/login', function (req, res) {
    exp.login(req.body.credentials, req.body.password, function (e, token, username) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            res.json({success: true, result: token, username: username});
        }
    });
});

app.post('/user/register', function (req, res) {
    exp.register(req.body.username, req.body.password, req.body.email, req.body.ssn, function (e) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            res.json({success: true});
        }
    });
});

module.exports = exp;
