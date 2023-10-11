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
  


module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id).exec();

        if (comment.user == req.user.id) {
            let postId = comment.post;

            await comment.remove();

            const post = await Post.findByIdAndUpdate(
                postId,
                { $pull: { comments: req.params.id } }
            ).exec();

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        // Handle errors here
        console.error(err);
        return res.redirect('back');
    }
};
