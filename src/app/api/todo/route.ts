import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db().collection("todos");
  try {
    const todos = await collection
      .aggregate([
        {
          $group: {
            _id: "$section",
            todos: {
              $push: {
                id: "$_id",
                task: "$task",
                done: "$done",
                date: "$date",
                subtasks: "$subtasks",
              },
            },
          },
        },
        {
          $project: {
            section: "$_id",
            todos: 1,
            _id: 0,
          },
        },
        {
          $sort: {
            section: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { task, section, done, date } = await req.json();
  try {
    const todos = { section, task, done, Date: date };
    const result = await collection.insertOne(todos);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { id, status, task } = await req.json();

  if (task) {
    try {
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          task: task,
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
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

  // if (status !== null) {
  //   try {
  //     const filter = { _id: new ObjectId(id) };
  //     const update = {
  //       $set: {
  //         done: status,
  //       },
  //     };

  //     const result = await collection.updateOne(filter, update);

  //     if (result.modifiedCount === 1) {
  //       return NextResponse.json(
  //         { message: "Todo updated successfully" },
  //         { status: 200 }
  //       );
  //     } else {
  //       return NextResponse.json(
  //         { message: "Todo not found" },
  //         { status: 404 }
  //       );
  //     }
  //   } catch (error) {
  //     return NextResponse.json(error, { status: 500 });
  //   }
  // }
  if (status !== null) {
    try {
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          done: status,
        },
      };

      // Update main task status
      const result = await collection.updateOne(filter, update);

      if (result.modifiedCount === 1) {
        // Update subtasks status
        const taskDocument = await collection.findOne(filter);
        const subtasks = taskDocument?.subtasks || [];
        const updatedSubtasks = subtasks.map((subtask:any) => ({
          ...subtask,
          done: status,
        }));

        await collection.updateOne(filter, {
          $set: { subtasks: updatedSubtasks },
        });

        return NextResponse.json(
          { message: "Todo and subtasks updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Todo not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }
  return NextResponse.json({ status: 500 });
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
