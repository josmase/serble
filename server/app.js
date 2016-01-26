'use strict';

/**
 * Main server-side application initialization
 * @author Emil Bertilsson, Serble
 * @version 2016-01-26
 */

// Constants
var PORT_DEFAULT = 3000;

// Module loading
var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');

// Private (Custom) modules
var articles = require('./articles.js');

var database = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'serble',
    user: 'serble',
    password: 'serble'
});

database.connect(function (e) {
    if (e) {
        console.log("Database error: " + e);
    } else {
        // Sets up the database structure
        var input = readline.createInterface({
            input: fs.createReadStream('./sql/serble.sql'),
            terminal: false
        });

        var str = '';
        input.on('line', function (chunk) {
            str += chunk;
        });

        input.on('close', function () {
            database.query(str.toString('ascii'), function (e) {
                if (e) {
                    console.log("Database error: " + e);
                }
            });
        });
    }
});

// Application environment variables
app.set('port', process.env.port || PORT_DEFAULT);
app
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', function (req, res) {
        console.log("test");
        res.sendFile('/../client/dist/index.html');
    });

// Creates the server
http.listen(app.get('port'), function () {
    console.log("Server started at port " + app.get('port'));
});
