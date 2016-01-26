'use strict';

/**
 * Network middleware
 * @author Emil Bertillson, Serble
 * @version 2016-01-26
 */
var exp = {
    prepareOutput: function (identifier, data) {
        return {
            identifier: identifier,
            data: data
        }
    },

    send: function (res, identifier, data) {
        res.send(net.prepareOutput(identifier, data));
    }
};

module.exports = exp;