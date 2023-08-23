import { connect } from "@/dbConfig/dbConfig";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { username, email, password, confirmPassword } = reqBody;
    logger.info(`Sign up request: %s`, reqBody);
    /* Validation */
    const errors = [];
    if (!username) {
      errors.push("Username is required");
    }
    if (!email) {
      errors.push("Email is required");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (!confirmPassword) {
      errors.push("Confirm password is required");
    } else if (password !== confirmPassword) {
      errors.push("Password and Confirm password fields are not matching");
    }
    if (errors.length > 0) {
      return NextResponse.json({
        status: 0,
        error: errors,
      });
    }
    /* Valid data, save in DB */
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashPwd,
    });
    const savedUser = await user.save();

    return NextResponse.json(
      { status: 1, msg: "Success", data: savedUser },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { status: 0, error: [e.message] },
      { status: 500 }
    );
  }
};
