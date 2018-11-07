const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const http = require('http');
const constants = require('../utilities/constants');

module.exports = (app) => {
    // transforms localhost to http://localhost
    http.createServer(app);

    // enable CORS policy
    app.use(cors());

    // cookie and body parser configs
    app.use(cookieParser());
    app.use(bodyParser.json({ extended: true }));

    // session configs
    app.use(session({
        secret: constants.PRIVATE_KEY,
        resave: false,
        saveUninitialized: false
    }));

    // authentication with passport configs
    app.use(passport.initialize());
    app.use(passport.session());

    // static files folder config
    app.use(express.static('client/app/content/dist'));

    console.log('Express loaded!');
};
