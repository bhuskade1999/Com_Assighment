const express = require("express");
const {
  createPost,
  likesAndUnlikesPost,
  addComments,
  getPosts,
} = require("../controllers/post");

const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/post/:id").get(isAuthenticated, likesAndUnlikesPost);
router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/get/allPosts").get(getPosts);

router.route("/post/comment/:id").put(isAuthenticated, addComments);

module.exports = router;
