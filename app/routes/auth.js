var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.get('/about', authController.about);

    app.get('/contact', authController.contact);

    app.get('/features', authController.features);
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        }
    ));
    
    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin',  { 
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
        }
    ));

    app.get('/index', authController.index);

    app.get('*', isLoggedIn, authController.dashboard);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/index');
    }
}

