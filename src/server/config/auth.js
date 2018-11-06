module.exports = {
    isAuthenticated: (req, res, next) => {
        // another way of check if the user is logged in
        // if(!req.user) {
        //     return res.redirect("/users/login");
        // }
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/users/login');
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                if (req.user.roles.indexOf(role) == -1) {
                    res.status(401);
                    res.send('401 Unauthorized');
                    res.end();
                    return;
                }
                
                next();
            } else {
                res.redirect('/users/login');
            }
        };
    }
};