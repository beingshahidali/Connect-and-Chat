   const Post = require('../models/post');
  const Comment = require('../models/comment');

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


module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id).exec();

        if (post.user == req.user.id) {
            await post.remove();

            // Using await for deleting comments associated with the post
            await Comment.deleteMany({ post: req.params.id }).exec();

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
