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

var privateKey = "q"
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
        res.sendFile(path.resolve('./../client/dist/index.html'));
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

app.get('/articles/remove', function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.profile_id) {
            articles.removeArticle(req.query.id, function (e) {
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
            res.json({success: true, result: result});
        }
    });
});

app.post('/articles/post', function (req, res) {
    var data = req.body.data;

    if (typeof data == "string") {
        try {
            data = JSON.parse(data);
        } catch (e) {
            res.json({success: false, err: ["invalidjson"]});
            return;
        }
    } else if (typeof data != "object") {
        res.json({success: false, err: ["invalidjson"]});
        return;
    }

    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.user_id) {
            articles.postArticle(data, req.body.data, function (e, result) {
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

app.post('/user/profile/update', function (req, res) {
    tokens.tryUnlock(req.headers.authorization, function (data) {
        if (data.username) {
            users.updateProfile(data.username, req.body.data, function (e) {
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

var multer = require('multer');
var filename = "";
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './img/article/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({success: false, err_desc: err});
            return;
        }

        var data = req.body.data;

        if (typeof data == "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                res.json({success: false, err: ["invalidjson"]});
                return;
            }
        } else if (typeof data != "object") {
            res.json({success: false, err: ["invalidjson"]});
            return;
        }

        req.body.data.file = req.file.filename;
        tokens.tryUnlock(req.headers.authorization, function (data) {
            if (data.user_id) {
                articles.postArticle(data, req.body.data, function (e, result) {
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
    })

});


//read file from uploads folder

var fs = require('fs');

app.get('/file/:filename', function (req, res) {
    var filename;
    var defaultFile = __dirname + '/img/article/default.png';
    var retry = false;
    if (req.params.filename) {
        filename = __dirname + '/img/article/' + req.params.filename;
    }
    else {
        filename = defaultFile;
    }

    //read the file
    fs.readFile(filename, makeInformFunction(filename));

    function makeInformFunction() {
        return function (err, content) {
            if (err) {
                if (retry) {
                    res.json({success: false, err: err});
                    return
                }
                retry = true;
                filename = defaultFile;
                fs.readFile(filename, makeInformFunction(filename));
            }
            else {
                res.writeHead(200, {'Content-Type': 'image/gif'});
                res.end(content, 'binary');
            }
        }
    }
});
