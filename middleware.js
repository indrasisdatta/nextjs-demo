import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Request pathname", request.nextUrl.pathname);
  const isPublic = ["/user/login", "/user/signup", "/"].includes(
    request.nextUrl.pathname
  );
  const token = request.cookies.get("token")?.value || "";

  /* Already logged in users won't be able to access login, signup URLs */
  // if (isPublic && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  /* Not logged in users won't be able to access protected pages */
  // if (!isPublic && !token) {
  //   return NextResponse.redirect(new URL("/user/login", request.url));
  // }
}

export const config = {
  matcher: [
    // "/",
    // "/user/profile",
    // "/user/login",
    // "/user/signup",
    "/teacher/:path+",
  ],
};
