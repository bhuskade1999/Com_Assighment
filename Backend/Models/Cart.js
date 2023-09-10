const mongoose= require("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId

const CartSchema= new mongoose.Schema({
    userId: {
        type: ObjectId, 
        ref: "User",
        required: true,
        trim:true
    },
    items: [
        {
          productId: {
            type: ObjectId, 
            ref: "Product",
          },
        
          quantity: Number,
        },

        
      ],
    totalPrice: Number,
    
    totalItems: {
        type:Number,
        trim:true,
        default:0
    },
     
},{timestamps:true})
module.exports= mongoose.model("Cart",CartSchema)
