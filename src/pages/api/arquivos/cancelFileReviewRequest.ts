import Tarefa from "@/database/models/tarefaModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const file = JSON.parse(req.body);

    const cookies = parseCookies({ req });

    const isUserLider = file.metadata.projeto.usuarios.lider._id === cookies.id;

    if (isUserLider || cookies.tipo === "administrador") {
      const filesCollection = mongoose.connection.collection("Arquivos.files");
      const usersCollection = mongoose.connection.collection("Users");

      await usersCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(file.metadata.responsavelRevisao.id) },
        {
          $pull: {
            tarefas: new mongoose.Types.ObjectId(file.metadata.tarefaId) as any,
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
            "metadata.tarefaId": 1,
            "metadata.atribuidaPor": 1,
          },
        }
      );

      await Tarefa.deleteOne({ _id: new mongoose.Types.ObjectId(file.metadata.tarefaId) });

      res.status(200).end();
      return;
    }
    
    res.status(403).end();

  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
