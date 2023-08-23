import { NextResponse } from "next/server";

export const GET = () => {
  try {
    const response = NextResponse.json({
      stats: 0,
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
