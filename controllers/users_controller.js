const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
       console.log('Please enter the same password');
       return res.redirect('back');
    }
 
    User.findOne({ email: req.body.email })
       .exec()
       .then(user => {
          if (!user) {
             return User.create(req.body).then(newUser => {
                console.log('User created');
                res.redirect('/users/sign-in');
             });
          } else {
             console.log('User already exists');
             res.redirect('/users/sign-in');
          }
       })
       .catch(err => {
          console.error('Error in signing up:', err);
          res.redirect('back');
       });
 };


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}