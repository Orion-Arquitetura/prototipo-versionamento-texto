import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { project, user } = JSON.parse(req.body);

    const projectObjectID = new mongoose.Types.ObjectId(project._id);
    const userObjectID = new mongoose.Types.ObjectId(user._id);

    console.log({ project, user });

    const isNextLiderProjetista = project.usuarios.projetistas.some(
      (user1) => user1.nome === user.nome
    );

    if (isNextLiderProjetista) {
      await Projeto.updateOne(
        { _id: projectObjectID },
        {
          $set: { "usuarios.lider": userObjectID },
          $pull: { "usuarios.projetistas": userObjectID },
        }
      );

      await UserFuncionario.updateOne(
        { _id: userObjectID, "projetos.projeto": projectObjectID },
        { $pull: { "projetos.$.roles": "projetista" } }
      );

      await UserFuncionario.updateOne(
        { _id: userObjectID, "projetos.projeto": projectObjectID },
        { $addToSet: { "projetos.$.roles": "lider" } }
      );

      res.status(200).end();
      return;
    }

    await Projeto.updateOne(
      { _id: projectObjectID },
      {
        "usuarios.lider": userObjectID,
      }
    );

    await UserFuncionario.updateOne(
      { _id: userObjectID },
      { $set: { projetos: { projeto: projectObjectID, roles: ["funcionario", "lider"] } } }
    );

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
