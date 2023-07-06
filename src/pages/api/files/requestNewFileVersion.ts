import Arquivo from "@/database/models/arquivoModel";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, user, prazo } = JSON.parse(req.body);

  await UserFuncionario.updateOne(
    { _id: user._id },
    {
      $push: {
        "tarefas.novaVersao": {
          arquivoId: file._id,
          prazo,
          projeto: {
            nome: file.projeto.nome,
            id: file.projeto.id,
          },
        },
      },
    }
  );

  await Arquivo.updateOne(
    { _id: file._id },
    {
      novaVersaoSolicitada: true,
      responsavelNovaVersao: { nome: user.nome, id: user._id },
      prazoNovaVersao: prazo
    }
  );

  res.status(200).end();
}
