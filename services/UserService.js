import axios from "axios";

export const signupData = async (userData) => {
  try {
    const response = await axios.post("/api/users/signup", userData);
    return response.data;
  } catch (e) {
    return e.response?.data;
  }
};
