import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import connectToDatabase from "@/database/mongodbConnection";
import Projeto from "@/database/models/projectModel";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const cookies = parseCookies({ req });
  try {
    const reqData = JSON.parse(req.body);
    const projectData = await Projeto.findById(reqData.projectId).then((res) => res);
    const fileName = `${projectData.nome}.${reqData.filtros.conteudo}.${
      reqData.filtros.disciplina ? reqData.filtros.disciplina : reqData.filtros.tipo
    }.${reqData.filtros.etapa}`

    console.log(reqData.projectId)

    const newFile = new Arquivo({
      nome: fileName,
      projeto: {
        id: reqData.projectId,
        nome: projectData.nome
      },
      tipo: reqData.filtros.tipo,
      disciplina: reqData.filtros.disciplina,
      etapa: reqData.filtros.etapa,
      conteudo: reqData.filtros.conteudo,
      criadoPor: {
        userName: cookies['user-email'],
        userId: cookies['user-id']
      }
    });

    const newFileData = await newFile.save();

    res.status(200).json({
      data: newFileData,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
