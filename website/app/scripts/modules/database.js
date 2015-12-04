/**
 * Database
 *
 * @author Emil Bertilsson
 * @version 2015-12-04
 */

var mysql = require('mysql');
var database = [];
var connection = [];

var db_hostname = "localhost";
var db_username = "root";
var db_password = "";

database.connect = function(callback) {
    connection = mysql.createConnection({
        host : db_hostname,
        user : db_username,
        password : db_password
    });

    connection.connect(callback);
};

database.query = function(str, post, callback) {
    connection.query(str, post, callback);
};

database.end = function(callback) {
    connection.end();
};

exports.module = database;