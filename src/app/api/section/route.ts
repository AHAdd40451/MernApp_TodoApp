import clientPromise from "../../../libs/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { section } = await req.json();
  try {
    const todos = { section };
    const result = await collection.insertOne(todos);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { id } = await req.json();

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
