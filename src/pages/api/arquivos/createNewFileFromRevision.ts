import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, comentarioRevisao } = JSON.parse(req.body);

  const newUserData = await UserFuncionario.findOneAndUpdate(
    { _id: file.responsavelRevisao.id },
    {
      $pull: {
        "tarefas.emAndamento.revisao": { "arquivo.id": file._id },
      },
      $push: {
        "tarefas.concluidas.revisao": {
          arquivo: {
            nome: file.nome,
            id: file._id,
          },
          dataConclusao: new Date(Date.now()),
          prazo: file.prazoRevisao,
          projeto: {
            nome: file.projeto.nome,
            id: file.projeto.id,
          },
        },
      },
    },
    { new: true }
  );

  res.status(200).json({ tarefas: newUserData.tarefas });
}
