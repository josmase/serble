'use strict';

/**
 * Main server-side application initialization
 * @author Emil Bertilsson, Serble
 * @version 2016-02-19
 */

// Constants and namespaces
var PORT_DEFAULT = 3000;

// Module loading
var express = require('express');
var https = require('https');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var crypto = require('crypto');
var multer = require('multer');

var articleStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/content/articles');
    },
    filename: function (req, file, cb) {
        var str = Date.now()
            + '-' + crypto.randomBytes(16).toString('hex')
            + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

        cb(null, str);
    }
});

var articleUpload = multer({
    storage: articleStorage,
    limits: {
        fieldNameSize: 50,
        files: 5,
        fileSize: 20 * 1024 * 1024
    }
});

var profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/content/avatars');
    },
    filename: function (req, file, cb) {
        var str = Date.now()
            + '-' + crypto.randomBytes(16).toString('hex')
            + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

        cb(null, str);
    }
});

var profileUpload = multer({
    storage: profileStorage,
    limits: {
        fieldNameSize: 50,
        files: 1,
        fileSize: 20 * 1024 * 1024
    }
});

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

var privateKey = "q";
var certificate = "asd";

var credentials = {key: privateKey, cert: certificate};

var app = express()
    .use(cors())
    .use(bodyParser.json());

app.listen(PORT_DEFAULT);

https.createServer(app);

app
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', function (req, res) {
    });

serble.objects.app = app;
serble.objects.database = database;

database.connect(function (e) {
    if (e) {
        console.log("Database error: " + e);
    }
});

var tokens = require('./tokens.js');
var users = require('./users.js');
var articles = require('./articles.js');

// HTTP Requests

app.delete('/articles/remove/:id', function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.profile_id) {
            articles.removeArticle(req.params.id, function (e) {
                if (e) {
                    res.json({success: false, err: e});
                } else {
                    res.json({success: true});
                }
            });
        } else {
            res.json({success: false, err: ["tokenerror"]});
        }
    }, function () {
        res.json({success: false, err: ["tokeninvalid"]});
    });
});

app.get('/articles/get', function (req, res) {
    var filter = req.query.filter;

    if (typeof filter == "string") {
        try {
            filter = JSON.parse(filter);
        } catch (e) {
            res.json({success: false, err: ["invalidjson"]});
            return;
        }
    } else if (typeof filter != "object") {
        res.json({success: false, err: ["invalidjson"]});
        return;
    }

    articles.getArticles(filter, function (e, result) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            articles.setArticleImages(result, function (result2) {
                res.json({success: true, result: result2});
            });
        }
    });
});

app.post('/articles/post', articleUpload.any(), function (req, res) {
    var data = req.body.data;

    if (typeof data == "string") {
        try {
            data = JSON.parse(data);
        } catch (e) {
            res.json({success: false, err: ["invalidjson"]});
            serble.unlinkFiles(req.files);
            return;
        }
    } else if (typeof data != "object") {
        res.json({success: false, err: ["invalidjson"]});
        serble.unlinkFiles(req.files);
        return;
    }

    data.zipcode = 90120;

    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.user_id) {
            articles.postArticle(data, req.body.data, function (e, result) {
                if (e) {
                    res.json({success: false, err: e});
                    serble.unlinkFiles(req.files);
                } else {
                    res.json({success: true});

                    if (req.files) {
                        var path;

                        req.files.forEach(function (ent) {
                            path = '/content/articles/' + ent.filename;

                            articles.addArticleImage(result, path, function () {});
                        });
                    }
                }
            });
        } else {
            res.json({success: false, err: ["tokenerror"]});
            serble.unlinkFiles(req.files);
        }
    }, function () {
        res.json({success: false, err: ["tokeninvalid"]});
        serble.unlinkFiles(req.files);
    });
});

app.get('/user/profile/get', function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        var filter = true;

        if ((req.query.username != null && data.username.toLowerCase() === req.query.username.toLowerCase()) || data.profile_id === req.query.profile_id) {
            filter = false;
        }

        users.getProfile(req.query.username, req.query.profile_id, filter, function (e, profile) {
            if (e) {
                res.json({success: false, err: e});
            } else {
                res.json({success: true, result: profile});
            }
        });
    }, function () {
        users.getProfile(req.query.username, req.query.profile_id, true, function (e, profile) {
            if (e) {
                res.json({success: false, err: e});
            } else {
                res.json({success: true, result: profile});
            }
        });
    });
});

app.post('/user/profile/update', profileUpload.any(), function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.username) {
            console.log(req.body.data);
            users.updateProfile(data.username, req.body.data, function (e) {
                if (e) {
                    res.json({success: false, err: e});
                    serble.unlinkFiles(req.files);
                } else {
                    res.json({success: true});

                    if (req.files && req.files[0]) {
                        users.setProfileImage(data.profile_id, '/content/avatars/' + req.files[0].filename);
                    }
                }
            });
        } else {
            res.json({success: false, err: ["tokenerror"]});
            serble.unlinkFiles(req.files);
        }
    }, function () {
        res.json({success: false, err: ["tokeninvalid"]});
        serble.unlinkFiles(req.files);
    });
});

app.post('/user/login', function (req, res) {
    users.login(req.body.credentials, req.body.password, function (e, token, username) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            res.json({success: true, result: token, username: username});
        }
    });
});

app.post('/user/register', function (req, res) {
    users.register(req.body.username, req.body.password, req.body.email, req.body.ssn, function (e) {
        if (e) {
            res.json({success: false, err: e});
        } else {
            res.json({success: true});
        }
    });
});

app.get('/content/:path/:file', function (req, res) {
    var path;
    var file;

    var defaultPath = __dirname + '/content/';

    var retry = false;

    if (req.params.path) {
        path = __dirname + '/content/' + req.params.path + "/";
    } else {
        path = defaultPath;
    }

    if (req.params.file) {
        file = req.params.file;
    } else {
        file = "default.png";
    }

    //read the file
    fs.readFile(path + file, makeInformFunction(path + file));

    function makeInformFunction() {
        return function (err, content) {
            if (err) {
                if (retry) {
                    res.json({success: false, err: err});
                    return
                }
                retry = true;
                fs.readFile(path + file, makeInformFunction(path + file));
            } else {
                res.writeHead(200, {'Content-Type': 'image/gif'});
                res.end(content, 'binary');
            }
        }
    }
});
