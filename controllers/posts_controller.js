const Post = require('../models/post')

module.exports.create = async function (req, res) {
    try {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id
      });
  
      return res.redirect('back');
    } catch (err) {
      console.error('Error in creating a post:', err);
      // You should add proper error handling logic here
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  