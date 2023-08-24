import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectID, user } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(projectID);
  const userObjectID = new mongoose.Types.ObjectId(user._id);

  const projeto = await Projeto.findOne({ _id: projectObjectID }).exec();

  const isUserAlreadyInProject = projeto.usuarios.find(
    (usuario) => usuario.id.toString() === user._id
  );

  if (isUserAlreadyInProject) {
    await UserFuncionario.updateOne(
      { _id: userObjectID, "projetos.id": projectObjectID },
      { $addToSet: { "projetos.$.roles": "lider" } }
    );

    await Projeto.updateOne(
      {
        _id: projectObjectID,
        "usuarios.id": userObjectID,
      },
      { $addToSet: { "usuarios.$.roles": "lider" } }
    );

    res.status(200).end();
    return;
  }

  await UserFuncionario.updateOne(
    { _id: userObjectID },
    {
      $addToSet: {
        projetos: {
          nome: projeto.nome,
          id: projectObjectID,
          roles: ["funcionario", "lider"],
        },
      },
    }
  );

  await Projeto.updateOne(
    { _id: projectObjectID },
    {
      $addToSet: {
        usuarios: {
          nome: user.nome,
          id: userObjectID,
          roles: ["funcionario", "lider"],
        },
      },
    }
  );

  res.status(200).end();
}
