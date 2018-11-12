const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // account api
    app.post('/api/account/register', controllers.users.registerPost);
    app.post('/api/account/login', controllers.users.loginPost);
    //app.get('/api/account/logout', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.users.logout);

    // admin api
    // app.get('/api/account/example-admin-page', auth.isInRole('Admin'), controllers.users.adminPage);

    // not found pages
    app.all('*', (req, res) => {
        return res.status(404).send({error: 'Not Found.'});
    });
};