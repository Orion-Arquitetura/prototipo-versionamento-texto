import Projeto from "@/database/models/projectModel";
import UserCliente from "@/database/models/userClienteModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectID, users } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(projectID);
  const usersObjectIDs = users.map(
    (user: { nome: string; id: string }) => new mongoose.Types.ObjectId(user.id)
  );

  await Projeto.findOneAndUpdate(
    { _id: projectObjectID },
    {
      $addToSet: {
        "usuarios.clientes": { $each: usersObjectIDs },
      },
    }
  );

  await UserCliente.updateMany(
    { _id: { $in: usersObjectIDs } },
    {
      $addToSet: {
        projetos: {
          projeto: projectObjectID,
          roles: ["cliente"],
        },
      },
    }
  );

  res.status(200).end();
}
