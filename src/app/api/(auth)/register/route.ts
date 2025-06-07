import { connectDb } from "@/lib/connectDb";
import User from "@/lib/models/userScheme";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { fullname, email, password } = await req.json();
    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        {
          message: "These email is already exist",
        },
        {
          status: 400,
        }
      );
    }
    let role;
    if (email === "chogueuramine@gmail.com") {
      role = "admin";
    } else {
      role = "user";
    }
    await User.create({ fullname, email, password, role });

    return NextResponse.json(
      {
        message: "user register success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while register" },
      { status: 500 }
    );
  }
}
