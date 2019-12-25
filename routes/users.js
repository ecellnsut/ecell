const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
var forceSsl = require('force-ssl-heroku');

const { forwardAuthenticated } = require('../config/auth');


router.use(forceSsl);

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
/*
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, team_name, college, address, number, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !team_name || !college || !address || !number || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      team_name,
      college,
      address,
      number,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          team_name,
          college,
          address,
          number,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          team_name,
          college,
          address,
          number,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

*/
// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/homeboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
