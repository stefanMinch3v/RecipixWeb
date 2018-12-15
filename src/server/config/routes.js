const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // account api
    app.post('/api/account/register', controllers.users.registerPost);
    app.post('/api/account/login', controllers.users.loginPost);
    //app.get('/api/account/logout', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.users.logout);

    // recipes api
    app.post('/api/recipes/create', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.create);
    app.get('/api/recipes/edit/:id', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.editGet);
    app.post('/api/recipes/edit', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.editPost);
    app.get('/api/recipes/all', controllers.recipes.all);
    app.get('/api/recipes/details/:id', controllers.recipes.details);
    app.get('/api/recipes/total-number', controllers.recipes.totalNumber);

    // ingredients api primary for search
    // TODO

    // admin api
    // app.get('/api/account/example-admin-page', auth.isInRole('Admin'), controllers.users.adminPage);

    // not found pages
    app.all('*', (req, res) => {
        return res.status(404).send({error: 'Not Found.'});
    });
};