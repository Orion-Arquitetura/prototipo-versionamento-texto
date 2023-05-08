import { NextApiRequest, NextApiResponse } from "next";
import Funcionario from "@/database/models/userFuncionarioModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = (await Funcionario.find().exec().then(data => data.map(element => {
    return { nome: element.nome, id: element._id };
  }))) as any;

  console.log(data)
  res.status(200).json(data);
}
