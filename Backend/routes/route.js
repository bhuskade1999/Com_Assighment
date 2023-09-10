
const express = require('express');

const router = express.Router()

const {isAuthenticated} = require("../Middleware/auth")

const {register,login,updateProfile,logout} = require("../Controller/userController")

const{createProduct,getProductByCategory,getProductById,getAllCategories} = require("../Controller/ProductController")

const {addToCarts,viewCarts,updateQuantity,removeItemfromCarts} = require("../Controller/CartController")

const {placeOrder,OrderHistory,getOrder} = require("../Controller/OrderController")


/*------------------------ (User Controller) -----------------------------------*/

router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/editUser").post(isAuthenticated,updateProfile)


/*------------------------------ (Product Controller) ----------------------------------*/ 

router.route("/createProduct").post(isAuthenticated,createProduct)
router.route("/getProductByCategory/:category").get(isAuthenticated,getProductByCategory)
router.route("/getProductById/:productId").get(isAuthenticated,getProductById)
router.route("/getAllCategories").get(isAuthenticated,getAllCategories)



/* ---------------------------------(Cart Controller)-----------------------------------*/

router.route("/addToCart").post(isAuthenticated,addToCarts)
router.route("/viewCarts").get(isAuthenticated,viewCarts)
router.route("/updateQuantity/:productId").put(isAuthenticated,updateQuantity) //update Quantity using product Id
router.route("/removeItem/:productId").delete(isAuthenticated,removeItemfromCarts) //remove item from the cart using productId



/* ---------------------------------(Order Controller)-----------------------------------*/

router.route("/placeOrder").post(isAuthenticated,placeOrder)
router.route("/OrderHistory").get(isAuthenticated,OrderHistory)
router.route("/getOrder/:orderId").get(isAuthenticated,getOrder)





module.exports = router