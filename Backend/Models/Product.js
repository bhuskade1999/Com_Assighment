const mongoose= require('mongoose');


const ProductSchema = new mongoose.Schema({
  
    title: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    availability: {
      type: Boolean,
      default:false,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

  });
  
  module.exports = mongoose.model('Product', ProductSchema);