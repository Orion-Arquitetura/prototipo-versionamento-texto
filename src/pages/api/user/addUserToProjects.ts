import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //esta funcao adiciona um único usuário a multiplos projetos
  const { userData, projetosSelecionados } = JSON.parse(req.body);

  const usersCollection = mongoose.connection.collection("Users");

  const projetosIds = projetosSelecionados.map(
    (projeto: { nome: string; id: string }) =>
      new mongoose.Types.ObjectId(projeto.id)
  );

  await usersCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(userData._id) },
    {
      $addToSet: { projetos: { $each: projetosSelecionados } },
    }
  );

  await Projeto.updateMany(
    { _id: { $in: projetosIds } },
    {
      $addToSet: { usuarios: { nome: userData.nome, id: userData._id } },
    }
  );

  res.status(200).end();
}
