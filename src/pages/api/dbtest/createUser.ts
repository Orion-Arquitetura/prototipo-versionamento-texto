import UserFuncionario from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await UserFuncionario.create({
    nome: "João Pedro Bruno Machado",
    email: "jpbm@orion.com",
  });

  res.status(200).end();
}
