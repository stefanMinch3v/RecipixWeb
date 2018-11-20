const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let userSchema = new mongoose.Schema({
    username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    salt: String,
    hashedPass: String,
    roles: [String]
});

// attach func to every user in order to validate if the passwords match
userSchema.method({
    authenticate: function (password) { 
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;  
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
    User.find({}).then(users => {
        if (users.length > 0) {
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, 'admin12');

        User.create({
            username: 'admin',
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@mail.com',
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Admin']
        });
    });
};