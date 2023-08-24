import { loggedinUser } from "@/utils/helpers";
import { NextResponse } from "next/server";
export const GET = () => {
  try {
    return NextResponse.json({
      status: 1,
      data: loggedinUser(),
    });
  } catch (e) {
    return NextResponse.json({ status: 0, error: e.message }, { status: 500 });
  }
};
