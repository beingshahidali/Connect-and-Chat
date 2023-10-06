const User = require('../models/user');

module.exports.profile = function(req,res){
   return res.render('user_profile')
}
module.exports.signUp = function(req,res){
   return res.render('user_sign_up')
}
module.exports.signIn = function(req,res){
   return res.render('user_sign_in')
}



// module.exports.create = async function(req, res) {
//    if (req.body.password != req.body.confirm_password) {
//       console.log('Please enter same password')
//       return res.redirect('back');
//    }

//    try {
//       const user = await User.findOne({ email: req.body.email }).exec();

//       if (!user) {
//          const newUser = await User.create(req.body);
//          console.log('user created');
//          return res.redirect('/users/sign-in');
//       } else {
//          console.log('user already exists');
//          return res.redirect('/users/sign-in');
//       }
//    } catch (err) {
//       console.error('Error in signing up:', err);
//       return res.redirect('back');
//    }
// };
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



module.exports.createSession = function(req,res){
   //TODO:

}