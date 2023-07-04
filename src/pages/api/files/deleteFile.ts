import Arquivo from "@/database/models/arquivoModel";
import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId, projectId } = JSON.parse(req.body);

  await Arquivo.findOneAndDelete({ _id: fileId })
    .exec()
    .then(async (document) => {
      console.log(document);
      await Arquivo.updateOne(
        {
          tipo: document.tipo,
          disciplina: document.disciplina,
          etapa: document.etapa,
          conteudo: document.conteudo,
          versao: document.versao - 1,
          ultimaVersao: false,
          "projeto.id": document.projeto.id,
          "projeto.nome": document.projeto.nome,
        },
        { ultimaVersao: true }
      );
    });

  await Projeto.updateOne({ _id: projectId }, { $pull: { arquivos: fileId } });

  res.status(200).end();
}
