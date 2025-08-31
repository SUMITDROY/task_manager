

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

async function getUserIdFromToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  return decoded ? (decoded as any).id : null;
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const userId = await getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: params.id, userId },
    { title },
    { new: true }
  );

  return updatedTask
    ? NextResponse.json(updatedTask)
    : NextResponse.json({ error: "Task not found" }, { status: 404 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const userId = await getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await Task.findOne({ _id: params.id, userId });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  task.completed = !task.completed;
  await task.save();

  return NextResponse.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const userId = await getUserIdFromToken(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deletedTask = await Task.findOneAndDelete({ _id: params.id, userId });

  return deletedTask
    ? NextResponse.json({ message: "Task deleted" })
    : NextResponse.json({ error: "Task not found" }, { status: 404 });
}
