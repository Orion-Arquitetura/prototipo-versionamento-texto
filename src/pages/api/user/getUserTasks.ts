import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;

  const usersCollection = mongoose.connection.collection("Users");

  const userData = await usersCollection.findOne({
    _id: new mongoose.Types.ObjectId(userId as string),
  });

  res.status(200).json({...userData?.tarefas});
}
