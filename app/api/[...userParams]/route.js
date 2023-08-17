import { NextResponse } from "next/server";

export const GET = (request, { params }) => {
  return NextResponse.json(
    {
      data: params.userParams,
    },
    { status: 200 }
  );
};
