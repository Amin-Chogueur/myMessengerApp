// app/api/messages/[conversationId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Message from "@/lib/models/messageSchema";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
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
    const conversationId = (await params).conversationId;
    const messages = await Message.find({
      conversationId,
    }).sort("createdAt");

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
