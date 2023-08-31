import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { project, users } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(project._id);

  const usersObjectIDs = users.map((user:{id:string, nome:string}) => new mongoose.Types.ObjectId(user.id));

  await Projeto.updateOne(
    { _id: projectObjectID },
    { $addToSet: { "usuarios.projetistas": { $each: usersObjectIDs }  } }
  );

  await UserFuncionario.updateMany(
    { _id: { $in: usersObjectIDs } },
    { $addToSet: { projetos: { projeto: projectObjectID, roles: ["funcionario", "projetista"] } } }
  );

  res.status(200).end();
}
