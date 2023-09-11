import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import { parseCookies } from "nookies";
import connectToDatabase from "@/database/mongodbConnection";
import formidable, { File } from "formidable";
import { createReadStream } from "fs";

function isFileValid(file: any) {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const cookies = parseCookies({ req });
  
    const { bucket } = await connectToDatabase("App");
    
    const form = formidable({});

    const [fields, files] = await form.parse(req);

    const {
      tipoDeArquivo,
      tipoDeConteudo,
      disciplina,
      etapaDoProjeto,
      conteudoDoArquivo,
    } = JSON.parse(fields.fileFilters as any);

    if ((files.arquivo as File[])[0].mimetype !== "application/pdf") {
      throw new Error("Formato de arquivo inválido.");
    }

    const projectData = await Projeto.findById(fields.projectId![0]);

    const fileName = `${projectData.nome}.${conteudoDoArquivo}.${tipoDeConteudo}.${disciplina}.${etapaDoProjeto}-R00`;

    const fileAlreadyExists = await bucket
      .find({ filename: fileName })
      .toArray();

    if (fileAlreadyExists.length > 0) {
      throw new Error(
        "Arquivo já existe. Se deseja criar uma nova versão solicite uma revisão."
      );
    }

    const newFileMetadata = {
      projeto: {
        id: fields.projectId![0],
        nome: projectData.nome,
      },
      tipo: tipoDeConteudo,
      disciplina,
      etapa: etapaDoProjeto,
      conteudo: conteudoDoArquivo,
      versao: 0,
      ultimaVersao: true,
      emRevisao: false,
      revisoes: [],
      criadoPor: {
        userName: cookies["nome"],
        userId: cookies["id"],
      },
    };

    const file = (files.arquivo as File[])[0];

    const uploadStream = bucket.openUploadStream(fileName, {
      metadata: newFileMetadata,
    });

    const newFileId = uploadStream.id;

    projectData.arquivos.push({ disciplina, id: newFileId });

    await projectData.save();

    const readStream = createReadStream(file.filepath);

    readStream.pipe(uploadStream);

    res.status(201).json({ok: "Ok"});
  } catch (e: any) {
    res.status(400).json({ Erro: e.message });
    return;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
