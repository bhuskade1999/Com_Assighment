const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  article_reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },

  user_reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  comment: {
    type: String,
    required: true,
  },
  
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
