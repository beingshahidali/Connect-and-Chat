const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user,
    });
  } catch (err) {
    // Handle errors here
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      // Assuming User.uploadedAvatar is a promise-based function
      await User.uploadedAvatar(req, res);

      user.name = req.body.name;
      user.email = req.body.email;

      if (req.file) {
        if (user.avatar) {
          fs.unlinkSync(path.join(__dirname, '..', user.avatar));
        }

        user.avatar = User.avatarPath + '/' + req.file.filename;
      }

      await user.save();
      return res.redirect('back');
    } catch (err) {
      // Handle errors here
      console.error(err);
      req.flash('error', err.message);
      return res.redirect('back');
    }
  } else {
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    title: 'Connect and Chat | Sign Up',
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: 'Connect and Chat | Sign In',
  });
};

module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const user = await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      req.flash('success', 'You have signed up, login to continue!');
      return res.redirect('back');
    }
  } catch (err) {
    // Handle errors here
    console.error(err);
    req.flash('error', err.message);
    return res.redirect('back');
  }
};

module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout(function(err){
    console.error(err);
  });
  req.flash('success', 'You have logged out!');
  return res.redirect('/');
};
