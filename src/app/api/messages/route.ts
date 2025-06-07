import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Conversation from "@/lib/models/conversationSchema";
import Message from "@/lib/models/messageSchema";
import { connectDb } from "@/lib/connectDb";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
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
    const { userId, role } = decoded;
    // 3. Use decoded data

    const { content, selectedConversationId } = await req.json();
    let conversationId;
    if (role === "user") {
      conversationId = (await Conversation.findOne({ userId }))?._id;
      if (!conversationId) {
        conversationId = (await Conversation.create({ userId }))._id;
      }
    }
    if (role === "admin") {
      conversationId = selectedConversationId;
    }

    // 2. If not, create it

    if (!content || !userId) {
      return NextResponse.json(
        { message: "Missing content or user ID" },
        { status: 400 }
      );
    }
    // 3. Create the message
    const message = await Message.create({
      conversationId,
      senderId: userId,
      role,
      content,
    });
    console.log(message);
    return NextResponse.json({ message });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not send message" },
      { status: 500 }
    );
  }
}

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
    const { userId } = decoded;
    const conversation = await Conversation.findOne({ userId });
    let conversationId;
    if (conversation) {
      conversationId = conversation._id;
    }

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
