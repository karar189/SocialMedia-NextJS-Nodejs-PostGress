import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const registerUser = (username, email, password) => {
  return axios
    .post(`${API_BASE_URL}/users`, { username, email, password })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to register user", error);
      throw error;
    });
};
export const loginUser = (username, password) => {
  return axios
    .post(`${API_BASE_URL}/users/login`, { username, password })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to login", error);
      throw error;
    });
};
