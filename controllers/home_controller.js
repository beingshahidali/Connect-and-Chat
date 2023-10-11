const Post = require('../models/post');

module.exports.home = async function(req, res) {
    try {
      // populate the user of each post
      const posts = await Post.find({})
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
            path: 'user'
          }
        })
        .exec();
  
      return res.render('home', {
        title: "Codeial | Home",
        posts: posts
      });
    } catch (err) {
      // Handle any errors that might occur during the query or rendering
      console.error(err);
      // You should add proper error handling logic here
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
// module.exports.actionName = function(req, res){}