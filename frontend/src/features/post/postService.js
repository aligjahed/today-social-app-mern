import axios from "axios";

const API_URL = "/api/posts/";

const createNewPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.post(API_URL + "create", post, config);

  return response.data;
};

const getAllPosts = async () => {
  const response = await axios.get(API_URL + "allposts");

  return response.data;
};

const postService = { createNewPost, getAllPosts };

export default postService;
