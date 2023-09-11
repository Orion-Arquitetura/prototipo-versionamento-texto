import Projeto from "@/database/models/projectModel";
import Tarefa from "@/database/models/tarefaModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 try {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  // const userType = parseCookies({ req })["tipo"];

  // if (userType !== "administrador") {
  //   res.status(403).end();
  //   return;
  // }

  const { user, project } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(project._id);

  const userObjectID = new mongoose.Types.ObjectId(user._id || user.id);

  const userDocument = await UserFuncionario.findOneAndUpdate(
    {
      _id: userObjectID,
    },
    {
      $pull: {
        projetos: { projeto: projectObjectID },
      },
    }
  )
    .populate("tarefas")
    .exec();

  const tarefasPendentes = userDocument.tarefas
    .filter((tarefa) => tarefa.projeto.toString() === project._id && tarefa.finalizada === false)
    .map((tarefa) => new mongoose.Types.ObjectId(tarefa._id.toString()));

  console.log(tarefasPendentes);

  if (tarefasPendentes.length > 0) {
    await Tarefa.deleteMany({ _id: tarefasPendentes });

    const filesCollection = mongoose.connection.collection("Arquivos.files");
    await filesCollection.updateMany(
      { "metadata.tarefaId": { $in: tarefasPendentes } },
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

    await UserFuncionario.updateOne(
      { _id: userObjectID },
      {
        $pull: { tarefas: { $in: tarefasPendentes } },
      }
    );
  }

  await Projeto.updateOne(
    {
      _id: projectObjectID,
    },
    { $pull: { "usuarios.projetistas": userObjectID } }
  );

  res.status(200).end();
 } catch(e) {
  console.log(e)
  res.status(500).end()
 }
}
