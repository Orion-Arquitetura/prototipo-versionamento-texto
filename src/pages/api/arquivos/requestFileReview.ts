import { NextApiRequest, NextApiResponse } from "next";
import Tarefa from "@/database/models/tarefaModel";
import mongoose from "mongoose";
import { parseCookies } from "nookies";
import UserFuncionario from "@/database/models/userFuncionarioModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { file, usuario, prazo, texto } = JSON.parse(req.body);

  const {"id": usuarioQueAtribuiuTarefa, "nome": usuarioQueAtribuiuNome, tipo} = parseCookies({req});

  const isUserLider = file.metadata.projeto.usuarios.lider._id === usuarioQueAtribuiuTarefa;

  if (isUserLider || tipo === "administrador") {
    const filesCollection = mongoose.connection.collection("Arquivos.files");

    const novaTarefa = new Tarefa({
      arquivoInicial: { id: file._id, nome: file.filename },
      projeto: file.metadata.projeto._id,
      atribuidaPor: new mongoose.Types.ObjectId(usuarioQueAtribuiuTarefa),
      responsavel: new mongoose.Types.ObjectId(usuario.id),
      prazo: prazo === "" ? "Sem prazo definido" : prazo,
      textoRequerimento: texto,
    });

    await novaTarefa.save();

    await filesCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(file._id) },
      {
        $set: {
          "metadata.emRevisao": true,
          "metadata.atribuidaPor": {
            nome: usuarioQueAtribuiuNome,
            id: new mongoose.Types.ObjectId(usuarioQueAtribuiuTarefa),
          },
          "metadata.responsavelRevisao": {
            nome: usuario.nome,
            id: new mongoose.Types.ObjectId(usuario.id),
          },
          "metadata.comentarioRevisao": texto,
          "metadata.prazoRevisao": prazo === "" ? "Sem prazo definido" : prazo,
          "metadata.tarefaId": novaTarefa._id,
        },
      }
    );

    await UserFuncionario.updateOne(
      { _id: new mongoose.Types.ObjectId(usuario.id) },
      {
        $addToSet: { tarefas: novaTarefa._id },
      }
    );

    res.status(200).end();
    return;
  }
  res.status(403).end()
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
