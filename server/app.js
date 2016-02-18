'use strict';

/**
 * Main server-side application initialization
 * @author Emil Bertilsson, Serble
 * @version 2016-02-18
 */

// Constants and namespaces
var PORT_DEFAULT = 3000;

// Module loading
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express()
    .use(cors())
    .use(bodyParser.json());

var http = require('http').Server(app);
var mysql = require('mysql');
var serble = require('./serble.js');

// Private (Custom) modules
var database = mysql.createConnection({
    host: serble.database.host,
    port: serble.database.port,
    database: serble.database.name,
    user: serble.database.user,
    password: serble.database.password
});

serble.objects.app = app;
serble.objects.database = database;

database.connect(function (e) {
    if (e) {
        console.log("Database error: " + e);
    }
});

serble.loadSettings = function () {
    database.query("SELECT * FROM `settings`", function (e, data) {
    });
};

serble.saveSetting = function (key) {
    database.query("UPDATE `settings` SET `value` = '" + serble.settings[key] + "' WHERE `key` = '" + key + "'", function (e) {
        if (e) {
            console.log("Database error: " + e);
        }
    });
};

serble.loadSettings();

var users = require('./users.js');
var articles = require('./articles.js');

// Application environment variables
app.set('port', process.env.port || PORT_DEFAULT);
app
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', function (req, res) {
        res.sendFile(path.resolve('./../client/dist/index.html'));
    });

// Creates the server
http.listen(app.get('port'), function () {
    console.log("Server started at port " + app.get('port'));
});
