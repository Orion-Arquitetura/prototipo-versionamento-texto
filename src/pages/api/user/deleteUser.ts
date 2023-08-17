import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userData = JSON.parse(req.body);
  const userId = new mongoose.Types.ObjectId(userData._id);
  const usersCollection = mongoose.connection.collection("Users");

  await Projeto.updateMany(
    { "usuarios.id": userId },
    { $pull: { usuarios: { id: userId } } }
  );

  await usersCollection.deleteOne({ _id: userId });

  res.status(200).end();
}
