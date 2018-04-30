/*
*
* JWT(Json Web Token) authentication implementated with Angular and Nodejs.Json Web Token) authentication implementated with Angular and Nodejs.
* Home: https://github.com/jixiangcn/angular-jwt-node#readme
*
*/

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");

const server = express();

const config = {
    mongodbConnString: 'mongodb://localhost/jwt',
    serverPort: 8081
};

mongoose.connect(config.mongodbConnString);

server.use(methodOverride());
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended: true}));
server.use(logger("combined"));
server.use(errorHandler());
server.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


// Routers
server.post('/register', function (req, res) {
    User.findOne({name: req.body.name, password: req.body.password}, function (err, user) {
        if (err) {
            res.status(500).json({info: "Error occured: " + err});
        } else {
            if (user) {
                res.status(200).json({info: "User already exists!"});
            } else {

                var newUser = new User();
                newUser.name = req.body.name;
                newUser.password = req.body.password;
                newUser.save(function (err, user) {

                    user.token = jwt.sign(
                        {user: user.name, password: user.password},
                        "secretOrPrivateKey",
                        {algorithm: "HS256", expiresIn: "1m"} //For testing purposes, a very short time is set.
                    );

                    // More options of jwt.sign()
                    // Please check https://github.com/auth0/node-jsonwebtoken

                    user.save(function (err, usr) {
                        res.status(200).json({
                            info: "Add a new user successfully！",
                            token: usr.token
                        });
                    });

                })
            }
        }
    });
});

server.post('/login', function (req, res) {
    User.findOne({name: req.body.name, password: req.body.password}, function (err, user) {
        if (err) {
            res.status(500).json({info: "Error occured: " + err});
        } else {
            if (user) {

                user.token = jwt.sign(
                    {user: user.name, password: user.password},
                    "secretOrPrivateKey",
                    {algorithm: "HS256", expiresIn: "1m"}
                );

                User.findByIdAndUpdate(
                    {_id: user._id},
                    {token: user.token},
                    function (err, usr) {
                        if (err) {
                            res.status(500).json({info: "Error occured: " + err});
                        } else {
                            res.status(200).json({
                                info: "user token is updated successfully！",
                                token: usr.token
                            });
                        }
                    });

            } else {
                res.status(200).json({info: "Incorrect login name or password"});
            }
        }
    });
});

server.get('/me', isAuthorized, function (req, res) {
    User.findOne({token: req.token}, function (err, user) {
        if (err) {
            res.status(500).json({info: "Error occured: " + err});
        } else {
            res.status(200).json(user);
        }
    });
});

// Routers END


function isAuthorized(req, res, next) {
    var header = req.headers["authorization"];
    var token, decoded;

    if (typeof header !== 'undefined') {
        var bearer = header.split(" ");
        token = bearer[1];

        try {
            decoded = jwt.verify(token, 'secretOrPrivateKey');
        }
        catch (err) {
            res.status(403).json({info: err});
        }

        if (typeof decoded !== 'undefined') {
            console.log(decoded);
            req.token = token;
            next();
        }
    } else {
        res.status(403).json({info: "No authorization info."});
    }
}


// Start Server
server.listen(config.serverPort, function () {
    console.log('API server is listening on port %d.', config.serverPort);
});