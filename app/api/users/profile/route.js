import { loggedinUser } from "@/utils/helpers";
import { NextResponse } from "next/server";

export const GET = () => {
  try {
    if (!loggedinUser()) {
      return NextResponse.json(
        {
          status: 0,
          msg: "Unauthorized access",
        },
        { status: 401 }
      );
    }
    return NextResponse.json({
      status: 1,
      data: loggedinUser(),
    });
  } catch (e) {
    return NextResponse.json({ status: 0, error: e.message }, { status: 500 });
  }
};
