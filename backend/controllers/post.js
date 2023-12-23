const Post = require("../model/post");

exports.createPost = async (req, res) => {
  console.log("post-requested");
  try {
    const newPostData = {
      title: req.body.title,
      caption: req.body.caption,
      owner: req.user._id,
    };
    console.log("1");

    const post = await Post.create(newPostData);
    console.log("2");
    res.status(200).json({ success: true, message: "Post Created " });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//===========================get all post =========================

exports.getPosts = async (req, res) => {
  try {
    let posts = await Post.find().populate("owner");
    res.status(200).json({ status: true, posts });
  } catch (err) {
    return res.status(500).josn(err.message);
  }
};

exports.likesAndUnlikesPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({ success: true, message: "Post Unlikes" });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({ success: true, message: "Post Likes" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//=============================== Add or Update Comments ================================

exports.addComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    let commentIndex = -1;

    // checking comment is already exist or not
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    //if comment exist the update comment
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      res.status(200).json({ success: true, message: "Comment Updated" });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();
      res.status(200).json({ success: true, message: "Comment Added" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
