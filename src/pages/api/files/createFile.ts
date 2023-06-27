import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import Projeto from "@/database/models/projectModel";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const cookies = parseCookies({ req });

  try {
    const reqData = JSON.parse(req.body);

    const projectData = await Projeto.findById(reqData.projectId).then((res) => res);

    const filterObject = {
      "projeto.nome": projectData.nome,
      tipo: reqData.filtros.tipo,
      conteudo: reqData.filtros.conteudo,
      disciplina: reqData.filtros.disciplina,
      etapa: reqData.filtros.etapa
    }

    const count = await Arquivo.count(filterObject).exec()

    const fileName = `${projectData.nome}.${reqData.filtros.conteudo}.${
      reqData.filtros.disciplina ? reqData.filtros.disciplina : reqData.filtros.tipo
    }.${reqData.filtros.etapa}-${count <= 9 ? `R0${count}` : `R${count}`}`;

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
      versao: `${count <= 9 ? `R0${count}` : `R${count}`}`,
      criadoPor: {
        userName: cookies["user-email"],
        userId: cookies["user-id"],
      },
    });

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
