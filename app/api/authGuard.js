import { loggedinUser } from "@/utils/helpers";
import { NextResponse } from "next/server";

export const authGuard = () => {
  if (!loggedinUser()) {
    return NextResponse.json(
      {
        status: 0,
        msg: "Unauthorized access",
      },
      { status: 401 }
    );
  }
};
