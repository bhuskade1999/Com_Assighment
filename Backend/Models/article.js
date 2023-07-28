const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true, "Please Enter title"]

  },

  content: {
    type: String,
    required:[true, "Please Enter content"]
  },

  is_premium: {
    type: Boolean,
    default: false,
  },
  
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
