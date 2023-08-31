import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userData = JSON.parse(req.body);
  const userId = new mongoose.Types.ObjectId(userData._id);

  if (userData.tipo === "funcionario") {
    const projetos = userData.projetos.map((projetoData: any) => {
      return {
        role: projetoData.roles[1],
        projectID: new mongoose.Types.ObjectId(projetoData.projeto),
      };
    });

    await UserFuncionario.deleteOne({ _id: userId });

    const projetosOperations = projetos.map((projeto: any) => {
      if (projeto.role === "projetista") {
        return {
          updateOne: {
            filter: { _id: projeto.projectID },
            update: {
              $pull: { "usuarios.projetistas": userId },
            },
          },
        };
      }

      if (projeto.role === "lider") {
        return {
          updateOne: {
            filter: { _id: projeto.projectID },
            update: {
              "usuarios.lider": null,
            },
          },
        };
      }
    });

    await Projeto.bulkWrite(projetosOperations);
  }

  if (userData.tipo === "cliente") {
    const projetosIDs = userData.projetos.map(
      (projetoData: any) => new mongoose.Types.ObjectId(projetoData.projeto._id)
    );
    await UserFuncionario.deleteOne({ _id: userId });

    await Projeto.updateMany(
      { _id: { $in: projetosIDs } },
      {
        $pull: { "usuarios.clientes": userId },
      }
    );
  }

  res.status(200).end();
}
