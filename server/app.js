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
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express()
    .use(cors())
    .use(bodyParser.json());

var http = require('http').Server(app);
var mysql = require('mysql');

// Private (Custom) modules
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
    }
});
var articles = require('./articles.js').use(app, database);

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
