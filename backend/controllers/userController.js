const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register new user
// @route POST api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, profilePic } = req.body;

  if ((!name, !username, !email, !password)) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check if user already exists
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist. Try logging in");
  }

  // Check if username already exists
  const usernameExist = await User.findOne({ username: username });

  if (usernameExist) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
    profilePic: profilePic,
  };

  const newUser = await User.create(user);
  res.status(200).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.id),
  });
});

// @desc login  user
// @route POST api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    res.status(400);
    throw new Error("Please enter your username or email");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please enter your password");
  }

  const userByEmail = await User.findOne({ email: email });
  const userByUsername = await User.findOne({ username: username });

  if (!userByEmail && !userByUsername) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  if (userByEmail) {
    const comparePassword = await bcrypt.compare(
      password,
      userByEmail.password
    );

    if (comparePassword) {
      res.json({
        _id: userByEmail.id,
        name: userByEmail.name,
        email: userByEmail.email,
        token: generateToken(userByEmail.id),
      });
    }
  }

  if (userByUsername) {
    const comparePassword = await bcrypt.compare(
      password,
      userByUsername.password
    );

    if (comparePassword) {
      res.json({
        _id: userByUsername.id,
        name: userByUsername.name,
        email: userByUsername.email,
        token: generateToken(userByUsername.id),
      });
    }
  }
});

// @desc Update user data
// @route PUT api/users/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;

  if (!profilePic) {
    res.status(400);
    throw new Error("Please select profile pic");
  }

  findByIdAndUpdate(req.user.id, req.body);
  res.status(200).json({
    message: "Profile picture updated successfully",
  });
});

const generateToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET);
};

module.exports = { registerUser, loginUser, updateUser };
