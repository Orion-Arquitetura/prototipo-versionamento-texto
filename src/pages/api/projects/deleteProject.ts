import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase("App");

  const { _id, usuarios } = await Projeto.findById(req.body)
    .exec()
    .then((result) => result);

  if (usuarios.length > 0) {
    const usersCollection = mongoose.connection.collection("Users");

    const updateUsersOperations = usuarios.map((user: any) => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(user.id) },
        update: { $pull: { "permissoes.projetos": { id: _id.toString() } } },
      },
    }));

    await usersCollection.bulkWrite(updateUsersOperations);
  }

  await Projeto.deleteOne({ _id });

  res.status(200).end();
}
