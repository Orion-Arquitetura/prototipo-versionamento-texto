import mongoose from "mongoose";
import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, userId } = JSON.parse(req.body);

  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId) },
    { $pull: { "permissoes.projetos": { id: projectId } } }
  );

  await Projeto.findOneAndUpdate({_id: new mongoose.Types.ObjectId(projectId)}, {
    $pull: {usuarios: {id: new mongoose.Types.ObjectId(userId)}}
  })
  res.status(200).end();
}
