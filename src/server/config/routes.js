const controlles = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // users page
    app.post('/api/account/register', controlles.users.registerPost);
    app.post('/api/account/login', controlles.users.loginPost);
    app.post('/api/account/logout', auth.isAuthenticated, controlles.users.logout);

    // admin page
    // app.get('/api/users/example-admin-page', auth.isInRole('Admin'), controlles.users.adminPage);

    // not found pages
    app.all('*', (req, res) => {
        return res.status(404).send({error: 'Not Found.'});
    });
};