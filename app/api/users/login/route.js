import User from "@/models/userModel";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export const POST = async (request) => {
  const { email, password } = await request.json();
  const user = await User.findOne({
    $or: [{ username: email }, { email: email }],
  });
  logger.info(`User retrieved: %s`, user);
  if (!user) {
    return NextResponse.json(
      {
        status: 0,
        error: "Invalid credentials",
      },
      { status: 400 }
    );
  }
  const validPwd = await bcrypt.compare(password, user.password);
  if (!validPwd) {
    return NextResponse.json(
      {
        status: 0,
        error: "Invalid password",
      },
      { status: 400 }
    );
  }
  /* Valid data, generate token */
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const response = NextResponse.json(
    {
      status: 1,
      msg: "Success",
      token,
    },
    { status: 200 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
};
