import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //esta funcao adiciona um único usuário a multiplos projetos
  const { userData, projects } = JSON.parse(req.body);

  const usersCollection = mongoose.connection.collection("Users");

  //adiciona os projetos ao documento do usuario
  const updateUserOperations = projects.map((project: { nome: string; id: string }) => {
    return {
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(userData.id) },
        update: { $push: { "permissoes.projetos": project } },
      },
    };
  });

  await usersCollection.bulkWrite(updateUserOperations);

  //adiciona o usuário aos documentos dos projetos
  const updateProjectsOperations = projects.map((project: { nome: string; id: string }) => {
    return {
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(project.id) },
        update: { $push: { usuarios: {nome: userData.nome, id: userData.id} } },
      },
    };
  });

  await Projeto.bulkWrite(updateProjectsOperations)

  res.status(200).end();
}
