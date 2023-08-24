import { NextResponse } from "next/server";
import { authGuard } from "../../authGuard";

export const GET = () => {
  try {
    authGuard();
    const response = NextResponse.json({
      status: 1,
      msg: "Logout success",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (e) {
    return NextResponse.json({ status: 0, error: e.message }, { status: 500 });
  }
};
