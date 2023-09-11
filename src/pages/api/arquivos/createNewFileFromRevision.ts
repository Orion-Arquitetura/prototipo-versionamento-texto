import UserFuncionario from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import connectToDatabase from "@/database/mongodbConnection";
import { parseCookies } from "nookies";
import { createReadStream } from "fs";
import mongoose from "mongoose";
import Tarefa from "@/database/models/tarefaModel";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = parseCookies({ req });

    const { bucket } = await connectToDatabase("App");

    const filesCollection = mongoose.connection.collection("Arquivos.files");

    const form = formidable({});

    const [fields, files] = await form.parse(req);

    const oldVersionData = JSON.parse(fields.oldVersionData);

    const texto = fields.texto[0];

    const newFileMetadata = {
      projeto: {
        id: oldVersionData.metadata.projeto._id,
        nome: oldVersionData.metadata.projeto.nome,
      },
      tipo: oldVersionData.metadata.tipo,
      disciplina: oldVersionData.metadata.disciplina,
      etapa: oldVersionData.metadata.etapa,
      conteudo: oldVersionData.metadata.conteudo,
      versao: oldVersionData.metadata.versao + 1,
      ultimaVersao: true,
      emRevisao: false,
      revisoes: [],
      criadoPor: {
        userName: cookies["nome"],
        userId: cookies["id"],
      },
    };

    const fileName = `${oldVersionData.metadata.projeto.nome}.${oldVersionData.metadata.conteudo}.${
      oldVersionData.metadata.tipo
    }.${oldVersionData.metadata.disciplina}.${oldVersionData.metadata.etapa}-R${
      oldVersionData.metadata.versao + 1 > 9
        ? oldVersionData.metadata.versao + 1
        : `0${oldVersionData.metadata.versao + 1}`
    }`;

    const file = (files.arquivo as File[])[0];

    const uploadStream = bucket.openUploadStream(fileName, {
      metadata: newFileMetadata,
    });

    const readStream = createReadStream(file.filepath);

    readStream.pipe(uploadStream);

    const newFileId = uploadStream.id;

    await filesCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(oldVersionData._id) },
      {
        $set: {
          "metadata.emRevisao": false,
          "metadata.ultimaVersao": false,
        },
        $addToSet: {
          "metadata.revisoes": oldVersionData.metadata.tarefaId,
        },
      }
    );

    await Tarefa.updateOne(
      { _id: new mongoose.Types.ObjectId(oldVersionData.metadata.tarefaId) },
      {
        $set: {
          textoResposta: texto,
          dataFinalizacao: new Date().toLocaleDateString("pt-BR").split("T")[0],
          arquivoFinal: {
            id: new mongoose.Types.ObjectId(newFileId.toString()),
            nome: fileName,
          },
          finalizada: true,
        },
      }
    );

    await Projeto.updateOne(
      { _id: new mongoose.Types.ObjectId(oldVersionData.metadata.projeto._id) },
      {
        $addToSet: { arquivos: { disciplina: oldVersionData.metadata.disciplina, id: newFileId } },
      }
    );

    res.status(201).json({ ok: "Ok" });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
