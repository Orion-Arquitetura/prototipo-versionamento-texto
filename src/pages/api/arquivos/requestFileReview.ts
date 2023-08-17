import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file, usuario, prazo, texto } = JSON.parse(req.body);

  const usersCollection = mongoose.connection.collection("Users");

  const projeto = await Projeto.findOne({
    _id: new mongoose.Types.ObjectId(file.metadata.projeto.id),
  });

  const isUserAlreadyInProject = projeto.usuarios.some(
    (user: any) => user.nome === usuario.nome
  ) as boolean;

  if (!isUserAlreadyInProject) {
    await usersCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(usuario.id) },
      {
        $push: {
          projetos: {
            id: file.metadata.projeto.id,
            nome: file.metadata.projeto.nome,
          },
        },
      }
    );
  }

  const filesCollection = mongoose.connection.collection("Arquivos.files");

  await filesCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(file._id) },
    {
      $set: {
        "metadata.emRevisao": true,
        "metadata.responsavelRevisao": usuario,
        "metadata.comentarioRevisao": texto,
        "metadata.prazoRevisao": prazo,
      },
    }
  );

  await usersCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(usuario.id) },
    {
      $push: {
        "tarefas.emAndamento": {
          arquivo: {
            nome: file.filename,
            id: file._id,
          },
          prazo,
          projeto: {
            nome: projeto.nome,
            id: projeto._id,
          },
          comentarioRevisao: texto,
        },
      },
    }
  );

  res.status(200).end();
  return;
}
