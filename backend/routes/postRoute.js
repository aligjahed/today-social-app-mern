const express = require("express");
const router = express.Router();

const {
  createPost,
  deletePost,
  allPosts,
  userPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authunicationMiddleware");

router.get("/allposts", allPosts);
router.get("/userposts", protect, userPosts);
router.post("/create", protect, createPost);
router.delete("/delete/:id", protect, deletePost);

module.exports = router;
