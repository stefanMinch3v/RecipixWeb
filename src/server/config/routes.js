const controlles = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // home page
    app.get('/', controlles.home.index);
    app.get('/about', controlles.home.about);

    // users page
    app.get('/users/register', controlles.users.registerGet);
    app.post('/users/register', controlles.users.registerPost);
    app.get('/users/login', controlles.users.loginGet);
    app.post('/users/login', controlles.users.loginPost); // passport.authenticate('local', { failureRedirect: '/users/login' }) / another way
    app.post('/users/logout', auth.isAuthenticated, controlles.users.logout); // get/post

    // admin page
    app.get('/users/example-admin-page', auth.isInRole('Admin'), controlles.users.adminPage);

    // not found pages
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};