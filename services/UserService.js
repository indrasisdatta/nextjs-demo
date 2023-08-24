import axios from "axios";

export const loginData = async (userData) => {
  try {
    const response = await axios.post("/api/users/login", userData);
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};

export const signupData = async (userData) => {
  try {
    const response = await axios.post("/api/users/signup", userData);
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};

export const logoutData = async (userData) => {
  try {
    const response = await axios.get("/api/users/logout");
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};

export const loggedinUserData = async () => {
  try {
    const response = await axios.get("/api/users/profile");
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};
