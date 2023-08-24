import Projeto from "@/database/models/projectModel";
import UserCliente from "@/database/models/userClienteModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectID, users } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(projectID);
  const usersObjectID = users.map(
    (user: { nome: string; id: string }) => new mongoose.Types.ObjectId(user.id)
  );

  const usersObjects = users.map((user: { nome: string; id: string }) => ({
    nome: user.nome,
    id: new mongoose.Types.ObjectId(user.id),
    roles: ["cliente"]
  }));

  const projeto = await Projeto.findOneAndUpdate(
    { _id: projectObjectID },
    {
      $addToSet: {
        usuarios: {
          $each: usersObjects,
        },
      },
    }
  );

  await UserCliente.updateMany(
    { _id: { $in: usersObjectID } },
    {
      $addToSet: {
        projetos: {
          nome: projeto.nome,
          id: projectObjectID,
          roles: ["cliente"]
        },
      },
    }
  );

  res.status(200).end();
}
