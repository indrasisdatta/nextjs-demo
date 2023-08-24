import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export const loggedinUser = () => {
  try {
    const cookieStore = cookies();
    const loginToken = cookieStore.get("token");
    // console.log("Login token", loginToken);
    const decodedToken = jwt.verify(
      loginToken?.value,
      process.env.TOKEN_SECRET
    );
    // console.log("Decoded token", decodedToken);
    return decodedToken || null;
  } catch (e) {
    console.error("Error fetching loggedinUser", e.message);
    return null;
  }
};

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token") || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  } catch (e) {
    return null;
  }
};
