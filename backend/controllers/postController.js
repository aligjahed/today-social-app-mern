const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

// @desc Create new post
// @route POST /api/posts/create
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const { postTitle, postDesc, postPic, name } = req.body;

  if (!postTitle || !postPic) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const newPost = await Post.create({
    user: req.user.id,
    name: name,
    postPic: postPic,
    postTitle: postTitle,
    postDesc: postDesc,
  });

  if (newPost) {
    res.status(200).json(newPost);
  } else {
    res.status(400);
    throw new Error("Create new post failed , try again later");
  }
});

// @desc Get all post
// @route GET /api/posts/allPosts
// @access Public
const allPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// @desc  Get all user posts
// @route GET /api/posts/userposts
// @access Private
const userPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

// @desc Delete post
// @route DELETE /api/posts/delete/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (req.user.id !== post.user.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (post) {
    await post.remove();
    res.status(200).json({ message: `post with id: ${req.params.id} deleted` });
  } else {
    res.status(400);
    throw new Error("Post doesn't exist");
  }
});

module.exports = {
  createPost,
  deletePost,
  allPosts,
  userPosts,
};
