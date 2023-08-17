import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID, projectsIDs } = JSON.parse(req.body);

  const projetosIDs = projectsIDs.map(
    (projeto: { nome: string; id: string }) =>
      new mongoose.Types.ObjectId(projeto.id)
  );

  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(userID) },
    {
      $pull: { projetos: { $in: projectsIDs } },
    }
  );

  await Projeto.updateMany(
    { _id: { $in: projetosIDs } },
    { $pull: { usuarios: { id: userID } } }
  );

  res.status(200).end();
}
