const constants = require('../utilities/constants');
const jwt = require('jsonwebtoken');

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.status(401);
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                if (req.user.roles.indexOf(role) == -1) {
                    return res.status(401).send({error: 'Unauthorized'});
                }
                
                next();
            } else {
                return res.status(401);
            }
        };
    },
    VerifyBearerToken: (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, constants.PRIVATE_KEY);

        next();
    },
    HandleErrorDataForToken: (err, req, res, next) => {
        // handle invalid json web token
        if (err.name === 'JsonWebTokenError') {
            res.status(401).send({error: 'Invalid token...'});
        }
    }
};