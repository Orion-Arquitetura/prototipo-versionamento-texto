import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const a = await UserFuncionario.findOne({ _id: "64ee0b888cba691d25a7baae" })
  .populate("projetos.projeto")

  res.status(200).json(a);
}
