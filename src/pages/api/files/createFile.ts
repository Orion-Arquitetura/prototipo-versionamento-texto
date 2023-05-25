import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import connectToDatabase from "@/database/mongodbConnection";
import Projeto from "@/database/models/projectModel";
import { FilesFiltersContext } from "@/contexts/filesFiltersContext";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const reqData = JSON.parse(req.body)
    const projectData = await Projeto.findById(reqData.projectId).then(res => res)

    const newFile = new Arquivo({
      nome: `${projectData.nome}.${reqData.filtros.tipo}.${reqData.filtros.disciplina}.${reqData.filtros.etapa}`,
      projeto: reqData.projectId
    })

    console.log(newFile)
    
    const newFileData = await newFile.save()

    res.status(200).json({
        data: newFileData
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
