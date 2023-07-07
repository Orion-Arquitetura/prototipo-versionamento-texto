import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, user, prazo } = JSON.parse(req.body);
  
  const usersCollection = mongoose.connection.collection("Users")

  await usersCollection.updateOne(
    { _id: user._id },
    {
      $push: {
        "tarefas.revisao": {
          arquivoId: file._id,
          prazo,
          projeto: {
            nome: file.projeto.nome,
            id: file.projeto.id,
          },
        },
      },
    }
  );

  await Arquivo.updateOne(
    { _id: file._id },
    {
      emRevisao: true,
      responsavelRevisao: { nome: user.nome, id: user._id },
      prazoRevisao: prazo,
    }
  );

  res.status(200).end();
}
