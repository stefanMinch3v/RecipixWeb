const mongoose = require('mongoose');

const User = require('../data/User');
require('../data/Comment');
require('../data/Recipe');
require('../data/Ingredient');
require('../data/Rating');

// mongoose.Promise = global.Promise; not needed anymore due to the new updates
module.exports = (settings) => {
    mongoose.connect(settings.db, { useNewUrlParser: true });
    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            throw err;
        }

        console.log('MongoDB ready!');

        // add administrator if the db is empty
        User.seedAdminUser();
    });

    db.on('error', (err) => console.log(`Database error: ${err}`));
};
