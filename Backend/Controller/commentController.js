const Article = require("../Models/article")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/user")
const CommentModel = require("../Models/comments")
 
 

// Comment on Articles (only logged-in users should be allowed to comment)
 exports.addComments=  async (req, res, next) => {
  try {
    let { article_reference,user_reference, comment } = req.body;
    user_reference = req.user._id;

    const newData ={
      article_reference:req.body.article_reference,
      user_reference:req.user._id,
      comment : req.body.comment,
    }

    const article = await Article.findById(article_reference)

    if(article.is_premium){
      if(req.user.is_premium_user){
        await CommentModel.create(newData)
        return res.status(201).json({ message: 'Comment added successfully' });
      }
      return res.status(400).json({ message: 'This is premium aricle you need to upgrade' });
    }

    await CommentModel.create(newData)
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

 