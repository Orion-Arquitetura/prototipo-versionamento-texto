import Arquivo from "@/database/models/arquivoModel";
import Projeto from "@/database/models/projectModel";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, newVersionComment } = JSON.parse(req.body);

  console.log(new Date(file.prazoNovaVersao));
  const newFile = { ...file };

  const versao = `${file.versao < 9 ? `R0${file.versao + 1}` : `R${file.versao + 1}`}`;

  delete newFile._id;
  delete newFile.dataCriacao;
  delete newFile.prazoNovaVersao;
  delete newFile.responsavelNovaVersao;
  delete newFile.novaVersaoSolicitada;

  newFile.nome = file.nome.replace(/R\d+/, versao);
  newFile.criadoPor = {
    userName: file.responsavelNovaVersao.nome,
    userId: file.responsavelNovaVersao.id,
  };
  newFile.comentario = newVersionComment;
  newFile.versao = file.versao + 1;
  newFile.ultimaVersao = true;

  await Arquivo.updateOne(
    { _id: file._id },
    {
      prazoNovaVersao: "",
      responsavelNovaVersao: {},
      novaVersaoSolicitada: false,
      ultimaVersao: false,
    }
  );

  const newFileVersion = new Arquivo(newFile);

  await newFileVersion.save();

  const newUserData = await UserFuncionario.findOneAndUpdate(
    { _id: file.responsavelNovaVersao.id },
    {
      $pull: {
        "tarefas.emAndamento.novaVersao": { "arquivo.id": file._id },
      },
      $push: {
        "tarefas.concluidas.novaVersao": {
          arquivo: {
            nome: newFileVersion.nome,
            id: newFileVersion._id,
          },
          dataConclusao: new Date(Date.now()),
          prazo: new Date(file.prazoNovaVersao),
          projeto: {
            nome: file.projeto.nome,
            id: file.projeto.id
          },
        },
      },
    },
    { new: true }
  );

  await Projeto.updateOne(
    { _id: file.projeto.id },
    {
      $push: {
        arquivos: new mongoose.Types.ObjectId(newFileVersion._id),
      },
    }
  );

  res.status(200).json({ tarefas: newUserData.tarefas });
  res.status(200).end();
}
