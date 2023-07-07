import Arquivo from "@/database/models/arquivoModel";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, user } = JSON.parse(req.body);

  const fileData = await Arquivo.findOneAndUpdate(
    { _id: file._id },
    {
      novaVersaoSolicitada: false,
      prazoNovaVersao: "",
      responsavelNovaVersao: {},
    }
  ).then(result => result)

  console.log(fileData)

  await UserFuncionario.updateOne(
    { _id: fileData.responsavelNovaVersao.id },
    {
      $pull: { "tarefas.novaVersao": { arquivoId: file._id } },
    }
  );

  res.status(200).end();
}
