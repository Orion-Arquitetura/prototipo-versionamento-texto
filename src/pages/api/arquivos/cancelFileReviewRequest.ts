import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = JSON.parse(req.body);

  const filesCollection = mongoose.connection.collection("Arquivos.files");
  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(file.metadata.responsavelRevisao.id) },
    {
      $pull: {
        "tarefas.emAndamento": {
          arquivo: {
            nome: file.filename,
            id: file._id,
          },
        },
      },
    }
  );

  await filesCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(file._id) },
    {
      $set: {
        "metadata.emRevisao": false,
      },
      $unset: {
        "metadata.responsavelRevisao": 1,
        "metadata.comentarioRevisao": 1,
        "metadata.prazoRevisao": 1,
      },
    }
  );

  res.status(200).end();
}
