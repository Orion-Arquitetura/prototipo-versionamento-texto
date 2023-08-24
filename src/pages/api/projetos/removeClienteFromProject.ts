import Projeto from "@/database/models/projectModel";
import UserCliente from "@/database/models/userClienteModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  const userType = parseCookies({req})["tipo"]

  if (userType !== "administrador") {
    res.status(403).end()
    return
  }

  const { user, project } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(project._id);

  const userObjectID = new mongoose.Types.ObjectId(user.id);

  await UserCliente.updateOne(
    {
      _id: userObjectID,
      "projetos.id": projectObjectID,
    },
    {
      $pull: {
        projetos: { id: projectObjectID },
      },
    }
  );

  await Projeto.updateOne(
    {
      _id: projectObjectID,
    },
    { $pull: { usuarios: {id: userObjectID} } }
  );

  res.status(200).end();
}
