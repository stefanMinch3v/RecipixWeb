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
    }
};