import clientPromise from "../../../libs/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { id, task, done, date, substaskId, status } = await req.json();

  try {
    if (substaskId) {
      try {
        const filter = { "subtasks._id": new ObjectId(substaskId) };
        const update = {
          $set: {
            "subtasks.$.done": status,
          },
        };

        const result = await collection.updateOne(filter, update);

        if (result.modifiedCount === 1) {
          return NextResponse.json(
            { message: "Substask updated successfully" },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Substask not found" },
            { status: 404 }
          );
        }
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
    }

    if (id) {
      const filter = { _id: new ObjectId(id) };
      const newSubtask = { task, done, _id: new ObjectId() };
      const update = {
        $push: {
          subtasks: newSubtask,
        },
        $set: {
          date,
        },
      };

      const result = await collection.updateOne(filter, update);

      if (result.modifiedCount === 1) {
        return NextResponse.json(
          { message: "Todo updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Todo not found" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
