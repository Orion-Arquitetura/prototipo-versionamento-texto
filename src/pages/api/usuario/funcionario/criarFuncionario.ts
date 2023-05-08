import { NextApiRequest, NextApiResponse } from "next";
import Funcionario from "@/database/models/userFuncionarioModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("Usuarios");
  try {
      const body = JSON.parse(req.body);
      const novo_funcionario = new Funcionario(body);
      const novo_funcionario_dados = novo_funcionario.save().then((result:any) => result);
      res.status(200).json(JSON.stringify(novo_funcionario_dados))
      return
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
    return
  }
}
