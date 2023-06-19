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
    }.${reqData.filtros.etapa}`;

    const newFile = new Arquivo({
      nome: fileName,
      projeto: {
        id: reqData.projectId,
        nome: projectData.nome,
      },
      tipo: reqData.filtros.tipo,
      disciplina: reqData.filtros.disciplina,
      etapa: reqData.filtros.etapa,
      conteudo: reqData.filtros.conteudo,
      criadoPor: {
        userName: cookies["user-email"],
        userId: cookies["user-id"],
      },
    });

    console.log(reqData.projectId);
    projectData.arquivos.push(newFile._id);
    
    await projectData.save()
    await newFile.save();
    res.status(201).end();

    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({ Erro: e });
    return;
  }
}
