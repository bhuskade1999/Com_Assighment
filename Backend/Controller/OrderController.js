const CartModel = require("../Models/Cart")
const ProductModel = require("../Models/Product")
const OrderModel = require("../Models/Order")


/*-------------------- ( Place Order from the Cart ) ------------------------*/

exports.placeOrder = async (req, res) => {

    try {
        // Find the user's cart
        const cart = await CartModel.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Calculate the total amount and create an order
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = await ProductModel.findById(item.productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            totalAmount += product.price * item.quantity;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
            });
        }

        const order = new OrderModel({
            userId: req.user._id,
            items: orderItems,
            totalAmount,
        });

        await order.save();

        // Clear the user's cart
        cart.items = [];
        cart.totalPrice = 0
        cart.totalItems = 0
        await cart.save();

        return res.status(201).json({ message: "Order Placed Successfully", order });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};





/*----------------------- ( Get Order History ) ---------------------------*/

exports.OrderHistory = async (req, res) => {
    try {
        // Find all orders for the specified user
        const orders = await OrderModel.find({ userId: req.user._id }).populate("items.productId", "title price");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found for the user' });
        }

        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




/*-------------------- ( Get Order Details By OrderId ) ------------------------*/

exports.getOrder = async (req, res) => {

    try {
        const orderId = req.params.orderId;

        const order = await OrderModel.findById(orderId).populate("items.productId","title price");

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

       return  res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
