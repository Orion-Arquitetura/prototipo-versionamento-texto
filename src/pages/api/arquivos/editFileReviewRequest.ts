import Tarefa from "@/database/models/tarefaModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, nome, tipo } = parseCookies({ req });
    const { file, usuario, prazo, texto } = JSON.parse(req.body);

    const isUserLider = file.metadata.projeto.usuarios.lider._id === id;

    const filesCollection = mongoose.connection.collection("Arquivos.files");

    if (!(isUserLider || tipo === "administrador")) {
      res.status(403).end();
      return;
    }

    if (file.metadata.responsavelRevisao.nome === usuario.nome) {
      await filesCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(file._id) },
        {
          $set: {
            "metadata.comentarioRevisao": texto,
            "metadata.prazoRevisao": prazo ? prazo : file.metadata.prazoRevisao,
          },
        }
      );

      await Tarefa.updateOne(
        { _id: new mongoose.Types.ObjectId(file.metadata.tarefaId) },
        {
          $set: {
            prazo: prazo ? prazo : file.metadata.prazoRevisao,
            textoRequerimento: texto,
          },
        }
      );

      res.status(200).end();
      return;
    }

    await UserFuncionario.updateOne(
      { _id: new mongoose.Types.ObjectId(usuario.id) },
      {
        $addToSet: { tarefas: new mongoose.Types.ObjectId(file.metadata.tarefaId) },
      }
    );

    await UserFuncionario.updateOne(
      { _id: new mongoose.Types.ObjectId(file.metadata.responsavelRevisao.id) },
      {
        $pull: { tarefas: new mongoose.Types.ObjectId(file.metadata.tarefaId) },
      }
    );

    await filesCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(file._id) },
      {
        $set: {
          "metadata.responsavelRevisao": { nome: usuario.nome, id: usuario.id },
          "metadata.comentarioRevisao": texto,
          "metadata.prazoRevisao": prazo ? prazo : file.metadata.prazoRevisao,
        },
      }
    );

    await Tarefa.updateOne(
      { _id: new mongoose.Types.ObjectId(file.metadata.tarefaId) },
      {
        $set: {
          prazo: prazo ? prazo : file.metadata.prazoRevisao,
          textoRequerimento: texto,
          responsavel: new mongoose.Types.ObjectId(usuario.id),
        },
      }
    );

    res.status(200).end();
    return;
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
