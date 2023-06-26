import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(req.body);
  const usersCollection = mongoose.connection.collection("Users");
  const projetosCollection = mongoose.connection.collection("Projetos");

  await projetosCollection.updateMany(
    { "usuarios.id": userId },
    { $pull: { usuarios: { id: userId } } }
  );

  await usersCollection.deleteOne({ _id: userId });

  res.status(200).end();
}
