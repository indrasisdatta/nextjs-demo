import { users } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = (request, { params }) => {
  const user = users.find((user) => user.id == params.id);

  return NextResponse.json(
    {
      data: user ?? null,
    },
    { status: 200 }
  );
};
