const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // account api
    app.post('/api/account/register', controllers.users.registerPost);
    app.post('/api/account/login', controllers.users.loginPost);
    app.get('/api/account/profile/', controllers.users.profile, auth.VerifyBearerToken, auth.HandleErrorDataForToken);
    app.get('/api/account/edit', controllers.users.editGet, auth.VerifyBearerToken, auth.HandleErrorDataForToken);
    app.post('/api/account/edit', controllers.users.editPost, auth.VerifyBearerToken, auth.HandleErrorDataForToken);
    //app.get('/api/account/logout', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.users.logout);

    // recipes api
    app.post('/api/recipes/create', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.create);
    app.get('/api/recipes/edit/:id', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.editGet);
    app.post('/api/recipes/edit', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.editPost);
    app.delete('/api/recipes/delete/:id', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.remove);
    app.get('/api/recipes/all', controllers.recipes.all);
    app.get('/api/recipes/filter-by-category', controllers.recipes.filterByCategory);
    app.get('/api/recipes/details/:id', controllers.recipes.details);
    app.post('/api/recipes/add-rating/:id', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.addRating);
    app.post('/api/recipes/add-comment/:id', auth.VerifyBearerToken, auth.HandleErrorDataForToken, controllers.recipes.addComment);
    app.get('/api/recipes/total-number', controllers.recipes.totalNumber);
    app.get('/api/recipes/total-number-for-category', controllers.recipes.totalNumberForCategory);
    
    // ingredients api primary for search
    // TODO

    // admin api
    // app.get('/api/account/example-admin-page', auth.isInRole('Admin'), controllers.users.adminPage);

    // not found pages
    app.all('*', (req, res) => {
        return res.status(404).send({error: 'Not Found.'});
    });
};