'use strict';

var serble = require('./serble.js');
var jwt = require('jsonwebtoken');

var app = serble.objects.app;

/**
 * JWT middleware
 * @author Emil Bertillson, Serble
 * @version 2016-02-17
 */
var exp = {
    /**
     * Signs and creates a token
     * @param payload Token payload
     */
    sign: function (payload) {
        return jwt.sign(payload, serble.jwt.secret, {expiresIn: serble.jwt.expiration});
    },

    /**
     * Verifies and decodes a token, false on failure
     * @param token Token
     */
    verifyToken: function (token) {
        var result;

        try {
            result = jwt.verify(token, serble.jwt.secret);
        } catch (e) {
            result = false;
        }

        return result;
    },

    /**
     * Attempts to unlock the token
     * @param token Token
     * @param onSuccess Success callback
     * @param onFail Failure callback
     */
    tryUnlock: function (token, onSuccess, onFail) {
        if (token) {
            var result = this.verifyToken(token);

            if (result) {
                onSuccess(result);
            } else {
                onFail();
            }
        } else {
            onFail();
        }
    }
};

module.exports = exp;