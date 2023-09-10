const CartModel = require("../Models/Cart")
const ProductModel = require("../Models/Product")



/*-------------------- (Add a product to the user's cart)---------------------*/

exports.addToCarts = async (req, res) => {
    try {

        let { userId, productId, quantity } = req.body;

      // Find the user's cart or create a new one
      userId = req.user._id

      let cart = await CartModel.findOne({ userId });

      if (!cart) {
        cart = new CartModel({ userId, items: [],totalPrice:0 });
      }
  
      // Find the product
      const product = await ProductModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      let price = product.price
    
      // Check if the product is already in the cart
      const existingItem = cart.items.find((item) => item.productId == productId);
  
      if (existingItem) {
        cart.totalPrice += price * quantity
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
        cart.totalPrice += price * quantity
      }

      cart.totalItems = cart.items.length
  
      await cart.save();
      return res.status(201).json({status:true, cart});

    }
    catch (error) { 
     return res.status(500).json({ error:error.message });
    }
  };
  


/* ---------------------- ( View the user's cart ) ----------------------------*/

exports.viewCarts = async (req, res) => {
    try {
      const cart = await CartModel.findOne({userId:req.user._id.toString()} ).populate("userId items.productId", 'name title price');
      
      if (!cart) {
        return res.status(404).json({ status:false,message: 'Cart not found' });
      }
  
      return res.status(200).json({status:true,cart});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  




/* ---------------- (Update the quantity of an item in the user's cart)------------------*/

exports.updateQuantity =async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { quantity } = req.body;
  
    try {
      const cart = await CartModel.findOne({ userId });

      if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "productId is invalid" })
      }

      const product = await ProductModel.findById(productId);
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const cartItem = cart.items.find((item) => item.productId.equals(productId));
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Item not found in the cart' });
      }
      cart.totalPrice -= product.price * cartItem.quantity //substract previous quantity amount
  
      cartItem.quantity = quantity;
      cart.totalPrice += product.price * quantity; // add new quantity amount

      await cart.save();
      return res.status(200).json({status:true,message:"Updated Successfully",cart});

    } catch (error) {
      res.status(500).json({ error:error.message });
    }
  };



  /* ------------------------ (Remove an item from the user's cart)----------------------------*/

  exports.removeItemfromCarts= async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
  
    try {
      const cart = await CartModel.findOne({ userId });
      const product = await ProductModel.findById(productId);
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const removeItems = cart.items.find((item) => item.productId.equals(productId));
      if(!removeItems) return res.status(404).json({ error: 'Product Not Found' });
      
      //getting updated item
      const updatedItems = cart.items.filter((item) => !item.productId.equals(productId));

      cart.items = updatedItems;
      cart.totalPrice -= product.price * removeItems.quantity
      cart.totalItems = updatedItems.length

      await cart.save();
      res.status(200).json({message:"removed Successfully",cart});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



