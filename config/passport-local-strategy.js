const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.error('Error in finding user --> Passport');
        return done(err);
    }
}));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false); // User not found
        }
        return done(null, user);
    } catch (err) {
        console.error('Error in finding user --> Passport');
        return done(err);
    }
});



module.exports = passport;