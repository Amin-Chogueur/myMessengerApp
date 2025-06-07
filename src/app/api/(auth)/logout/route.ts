import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.redirect(
      "https://amin-messenger-app.vercel.app/login"
    ); // or your production login URL

    response.cookies.set("chatAppToken", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // Clears the cookie
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Logout failed", success: false });
  }
}
