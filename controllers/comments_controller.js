const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post).exec();
  
      if (post) {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
  
        post.comments.push(comment);
        await post.save();
  
        return res.redirect('/');
      }
    } catch (err) {
      // Handle any errors that might occur during the query or creation
      console.error(err);
      // You should add proper error handling logic here
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  