

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const tasks = await Task.find({ userId: (decoded as any).id });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { title } = await req.json();
  const newTask = await Task.create({
    title,
    userId: (decoded as any).id,
  });

  return NextResponse.json(newTask);
}
