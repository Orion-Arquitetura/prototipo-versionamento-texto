import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import Tarefa from "@/database/models/tarefaModel";
import mongoose from "mongoose";
import { parseCookies } from "nookies";
import UserFuncionario from "@/database/models/userFuncionarioModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, usuario, prazo, texto } = JSON.parse(req.body);

  const usuarioQueAtribuiuTarefa = parseCookies({ req })["id"];

  const filesCollection = mongoose.connection.collection("Arquivos.files");

  await filesCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(file._id) },
    {
      $set: {
        "metadata.emRevisao": true,
        "metadata.atribuidaPor": new mongoose.Types.ObjectId(usuarioQueAtribuiuTarefa),
        "metadata.responsavelRevisao": new mongoose.Types.ObjectId(usuario.id),
        "metadata.comentarioRevisao": texto,
        "metadata.prazoRevisao": prazo,
      },
    }
  );

  const novaTarefa = new Tarefa({
    arquivoInicial: {id: file._id, nome: file.filename},
    projeto: file.metadata.projeto._id,
    atribuidaPor: new mongoose.Types.ObjectId(usuarioQueAtribuiuTarefa),
    responsavel: new mongoose.Types.ObjectId(usuario.id),
    prazo: prazo === "" ? "Sem prazo definido" : prazo,
    textoRequerimento: texto,
  });

  await novaTarefa.save();

  await UserFuncionario.updateOne(
    { _id: new mongoose.Types.ObjectId(usuario.id) },
    {
      $addToSet: { tarefas: novaTarefa._id },
    }
  );

  res.status(200).end();
  return;
}
