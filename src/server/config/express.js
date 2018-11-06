const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');
const tempData = require('tempData'); // acts exactly as the ASP.net TempData and can be useful when response redirect is invoked

module.exports = (app) => {
    // handlebars view engine configs
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main'
    }));
    app.set('view engine', '.hbs');

    // cookie and body parser configs
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));

    // session configs
    app.use(session({
        secret: 'some-secret-word!@#$%', // for instance: encryption.generateSalt()
        resave: false,
        saveUninitialized: false
    }));

    // tempdata config
    app.use(tempData);

    // authentication with passport configs
    app.use(passport.initialize());
    app.use(passport.session());

    // this middleware executes between every req/res 
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = {
                username: req.user.username,
                isAdmin: req.user.roles.indexOf('Admin') != -1
            };
        }
    
        next();
    });

    // static files folder config
    app.use(express.static('public'));

    console.log('Express loaded!');
};
