import { connectDb } from "@/lib/connectDb";
import User from "@/lib/models/userScheme";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "This user dos not exist",
        },
        {
          status: 400,
        }
      );
    }
    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Error password wrong" },
        { status: 400 }
      );
    }
    const tokenData = {
      userId: user._id,
      role: user.role,
      userName: user.fullname,
    };
    const token = jwt.sign(tokenData, secret, {
      expiresIn: "1d", // token expires in 1 day
    });
    const res = NextResponse.json(
      {
        userName: user.fullname,
      },
      { status: 200 }
    );

    res.cookies.set("chatAppToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax", // or "strict" in production,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error while login" }, { status: 500 });
  }
}
