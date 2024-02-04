import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const fetchPosts = () => {
  return axios
    .get(`${API_BASE_URL}/posts`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching posts:", error);
      throw error;
    });
};
export const addNewPost = (newPost) => {
  return axios
    .post(`${API_BASE_URL}/posts`, newPost)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to add post", error);
      throw error;
    });
};
export const deletePost = (postId) => {
  return axios
    .delete(`${API_BASE_URL}/posts/${postId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to delete post", error);
      throw error;
    });
};
export const updatePost = (postId, updatedPost) => {
  return axios
    .put(`${API_BASE_URL}/posts/${postId}`, updatedPost)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to update post", error);
      throw error;
    });
};
export const fetchPostsByUser = (userId) => {
  return axios
    .get(`${API_BASE_URL}/posts/user/${userId}`)
    .then((response) => {
      console.log(response.data); // Log the response data
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching user's posts:", error);
      throw error;
    });
};
