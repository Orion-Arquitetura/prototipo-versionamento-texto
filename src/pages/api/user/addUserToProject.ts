import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  try {
    const { userID, projects } = JSON.parse(req.body);
    const usersCollection = mongoose.connection.collection("Users");


    const updateOperations = projects.map((project:any) => ({
        updateOne: {
            filter: { _id: new mongoose.Types.ObjectId(userID) },
            update: { $push: { "permissoes.projetos": project } }
        }
    }))

    await usersCollection.bulkWrite(updateOperations);

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
