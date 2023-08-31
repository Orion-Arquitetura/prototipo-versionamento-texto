import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
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

  // const userType = parseCookies({req})["tipo"]

  // if (userType !== "administrador") {
  //   res.status(403).end()
  //   return
  // }
  
  const { user, project } = JSON.parse(req.body);

  const userObjectID = new mongoose.Types.ObjectId(user._id);
  const projectObjectID = new mongoose.Types.ObjectId(project._id);

  await UserFuncionario.updateOne(
    {
      _id: userObjectID,
    },
    {
      $pull: {
        projetos: { projeto: projectObjectID },
      },
    }
  );

  await Projeto.updateOne(
    {
      _id: projectObjectID,
    },
    { $set: { "usuarios.lider": null } }
  );

  res.status(200).end();
}
