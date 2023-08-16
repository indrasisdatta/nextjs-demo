import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Request pathname", request.nextUrl.pathname);
  // if (request.nextUrl.pathname === "/teacher/2") {
  return NextResponse.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: ["/teacher/:path+"],
};
