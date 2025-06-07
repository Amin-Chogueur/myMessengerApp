// app/api/conversations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Conversation from "@/lib/models/conversationSchema";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = req.cookies.get("chatAppToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // 2. Verify and decode token
    const decoded = jwt.verify(token, SECRET) as {
      userId: string;
      role: string;
    };
    const { role } = decoded;
    if (role !== "admin") {
      return NextResponse.json(
        { error: "Failed to fetch conversations, you are not the admin" },
        { status: 500 }
      );
    }

    const conversations = await Conversation.find().populate(
      "userId",
      "fullname email"
    );

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
