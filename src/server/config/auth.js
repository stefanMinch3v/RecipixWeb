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
        let collectionToken = req.headers.authorization;
        if (!collectionToken) {
            return res.status(401).send({error: constants.INVALID_TOKEN});
        }

        collectionToken = collectionToken.split(" ");

        const bearerName = collectionToken[0];
        if (bearerName !== 'Bearer') {
            return res.status(401).send({error: constants.INVALID_TOKEN});
        }

        const token = collectionToken[1];
        jwt.verify(token, constants.PRIVATE_KEY);

        next();
    },
    HandleErrorDataForToken: (err, req, res, next) => {
        // handle invalid json web token
        if (err.name === 'JsonWebTokenError') {
            res.status(401).send({error: constants.INVALID_TOKEN});
        }
    }
};