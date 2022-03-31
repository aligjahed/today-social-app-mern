const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: { type: String, required: true },
    postPic: {
      type: String,
      required: [true, "Please select an image"],
    },
    postTitle: {
      type: String,
      required: [true, "Please enter a title for your post"],
    },
    postDesc: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postModel);
