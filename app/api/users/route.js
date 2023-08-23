import { users } from "@/utils/db";
import { NextResponse } from "next/server";

/* User listing */
export const GET = (request) => {
  return NextResponse.json(
    {
      data: users,
    },
    { status: 200 }
  );
};

/* User add */
export async function POST(request) {
  const payload = await request.json();
  const error = [];
  if (!payload.firstName) {
    error.push("First name is required");
  }
  if (!payload.lastName) {
    error.push("Last name is required");
  }
  if (!payload.email) {
    error.push("Email is required");
  }
  if (error.length === 0) {
    return NextResponse.json(
      {
        data: payload,
        msg: "Success",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        error,
      },
      { status: 400 }
    );
  }
}

// export const dynamic = "force-dynamic";
