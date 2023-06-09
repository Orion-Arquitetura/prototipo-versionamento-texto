import Arquivo from "@/database/models/arquivoModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, user } = JSON.parse(req.body);

  const usersCollection = mongoose.connection.collection("Users")

  const fileData = await Arquivo.findOneAndUpdate(
    { _id: file._id },
    {
      emRevisao: false,
      prazoRevisao: "",
      responsavelRevisao: {},
    }
  ).then((result) => result);

  await usersCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(fileData.responsavelRevisao.id) },
    {
      $pull: { "tarefas.emAndamento.revisao": {"arquivo.id": new mongoose.Types.ObjectId(file._id)} },
    }
  );

  res.status(200).end();
}
