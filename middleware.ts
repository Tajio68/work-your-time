import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = (request: Request) => {
  if (true) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: [],
};
