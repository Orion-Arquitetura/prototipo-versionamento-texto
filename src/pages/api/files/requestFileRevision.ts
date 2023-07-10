import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { UserCliente } from "@/database/models/userClienteModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, user, prazo } = JSON.parse(req.body);

  if (user.tipo === "funcionario") {
    await UserFuncionario.updateOne(
      { _id: user._id },
      {
        $push: {
          "tarefas.emAndamento.revisao": {
            arquivo: {
              nome: file.nome,
              id: file._id
            },
            prazo,
            projeto: {
              nome: file.projeto.nome,
              id: file.projeto.id,
            },
          },
        },
      })
  }
  
  if (user.tipo === "cliente") {
    await UserCliente.updateOne(
      { _id: user._id },
      {
        $push: {
          "tarefas.emAndamento.revisao": {
            arquivo: {
              nome: file.nome,
              id: file._id
            },
            prazo,
            projeto: {
              nome: file.projeto.nome,
              id: file.projeto.id,
            },
          },
        },
      })
  }

  await Arquivo.updateOne(
    { _id: file._id },
    {
      emRevisao: true,
      responsavelRevisao: { nome: user.nome, id: user._id },
      prazoRevisao: prazo,
    }
  );

  res.status(200).end();
}
