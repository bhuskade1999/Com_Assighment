const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity: Number,
        },
    ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },

}, { timestamps: true })


module.exports = mongoose.model("Order", orderSchema)
