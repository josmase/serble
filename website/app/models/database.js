/**
 * Database model
 *
 * @uthor Emil Bertilsson
 * @version 2015-11-27
 */

var mysql = require('mysql');

var database = {};

database.connect = function(host, user, pass) {
    this.connection = mysql.createConnection({
        host : host,
        user : user,
        password : pass
    })

    this.connection.connect();
}

datatbase.query = function(q, callback) {
    this.connection.query(q, callback);
}

database.end = function() {
    this.connection.end();
}

module.exports = database;