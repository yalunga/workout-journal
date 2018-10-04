const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const User = require('./models/user-model');
const profileRoutes = require('./routes/profile-routes');

mongoose.connect('mongodb://<-username->:<-password->@ds121730.mlab.com:21730/workout-journal', ()=> {
  console.log('connected to mongodb');
});

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({ secret: "<-secret->" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        });
    }));
passport.use('local-login', new LocalStrategy({
     // by default, local strategy uses username and password, we will override with email
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true // allows us to pass back the entire request to the callback
 },
 function(req, email, password, done) { // callback with email and password from our form
     // find a user whose email is the same as the forms email
     // we are checking to see if the user trying to login already exists
     User.findOne({ 'email' :  email }, function(err, user) {
         // if there are any errors, return the error before anything else
         if (err)
             return done(err);
         // if no user is found, return the message
         if (!user)
             //return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
             return done(null, false);
         // if the user is found but the password is wrong
         if (!user.validPassword(password))
             return done(null, false); // create the loginMessage and save it to session as flashdata
         // all is well, return successful user
         return done(null, user);
     });

 }));


app.post('/signup',
  passport.authenticate('local-signup', { failureRedirect: '/' }),
  function(req, res, err) {
    console.log(err);
    if(!req.user) {
      res.render('/signup');
    } else {
      res.redirect('/profile/');
    }
  });

/*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

app.post('/login',
  passport.authenticate('local-login', { failureRedirect: '/' }),
  function(req, res, err) {
    if(err){}
    //console.log(req.user);
    if(!req.user) {
      console.log('User not found');
      res.redirect('/');
    } else {
      res.redirect('/profile/data');
    }
});



app.use('/profile', profileRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
