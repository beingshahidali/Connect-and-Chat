const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body).exec();
            if (updatedUser) {
                return res.redirect('back');
            } else {
                return res.status(404).send('User not found');
            }
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Connect and Chat | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Connect and Chat | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in signing up:', err);
        return res.redirect('back');
    }
};



// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        // Handle any errors here if needed
        if (err) {
            console.error(err);
        }
        console.log("logged out")
        return res.redirect('/');
    });
}