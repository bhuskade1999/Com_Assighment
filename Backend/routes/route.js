
const express = require('express');

const router = express.Router()

const {register,login,updateProfile,logout,deleteProfile,upgradeUser} = require("../Controller/userController")

const {isAuthenticated,verifyToken} = require("../Middleware/auth")

const {createArticle,getAllArticles,getArticle} = require("../Controller/articleController")
 
const {addComments} = require("../Controller/commentController")


/*------------------------ User Controller -----------------------------------*/

router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/editUser").post(isAuthenticated,updateProfile)
router.route("/goPremium").post(isAuthenticated, upgradeUser)
router.route("/deleteUser").delete(isAuthenticated,deleteProfile)


/*-------------------------------Article Controller -------------------------------*/

router.route("/createArticle").post(createArticle)
router.route("/getAllArticles").get(verifyToken,getAllArticles) //getting all articles 
router.route("/getArticle/:id").get(verifyToken,getArticle) //getting article by particular id


/*-------------------------------Comments Controller -------------------------------*/

router.route("/comment").post(isAuthenticated,addComments)




module.exports = router