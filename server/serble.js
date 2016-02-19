'use strict';

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

    verify: function (data) {
    }
};

module.exports = exp;