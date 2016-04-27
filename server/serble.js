'use strict';

var fs = require('fs');

var exp = {
    objects: {},
    settings: {},
    database: {
        host: "localhost",
        port: 3306,
        name: "serble",
        user: "serble",
        password: "serble"
    },

    jwt: {
        secret: "b4016b366540e3ba3c71fe9420731bbc",
        expiration: 86400
    },

    unlinkFiles: function (files, local) {
        if (files) {
            files.forEach(function (ent) {
                if (local) {
                    try {
                        fs.stat(ent, function (err, stat) {
                            if (err != null) {
                                fs.unlink(__dirname + ent);
                            }
                        });
                    } catch (e) {
                        console.log("Tried to remove unexisting files: ");
                        console.log(files);
                    }
                } else {
                    fs.unlink(ent.path);
                }
            });
        }
    }
};

module.exports = exp;