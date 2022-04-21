const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require('../models/user');
const bcrypt = require('bcrypt');

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

router.get('/', isLoggedOut, (req, res) => {
    const data = {
        title: "Login",
        error: req.query.error
    }

    res.render('login', data);
});


router.post('/', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/?error=true'
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    user.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/books');
        }
    });
});

router.get('/me', async (req,res) => {
    res.render('profile', { title: 'Profile', user: req.user })
})


module.exports = router;
