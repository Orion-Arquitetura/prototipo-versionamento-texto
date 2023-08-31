import UserAdministrador from "@/database/models/userAdministradorModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await UserAdministrador.create({
    nome: "Admin",
    email: "admin@orion.com",
  });

  res.status(200).end();
}
