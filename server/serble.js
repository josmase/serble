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
        files.forEach(function (ent) {
            if (local) {
                fs.stat(ent, function (err, stat) {
                    if (err != null) {
                        fs.unlink(__dirname + ent);
                    }
                });
            } else {
                fs.unlink(ent.path);
            }
        });
    }
};

module.exports = exp;