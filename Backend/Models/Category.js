const mongoose= require('mongoose');

const CategorySchema = new mongoose.Schema({
    Category: {
      type: String,
      required:[true, "Please Enter category"]
    },
  });
  
  module.exports = mongoose.model('Category', CategorySchema);

  