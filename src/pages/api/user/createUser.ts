import { NextApiRequest, NextApiResponse } from "next";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import UserAdministrador from "@/database/models/userAdministradorModel";
import UserCliente from "@/database/models/userClienteModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase("App");

  const { nome, email, tipo } = JSON.parse(req.body);

  if (tipo === "administrador") {
    await UserAdministrador.create({ nome, email });
    res.status(200).end();
    return;
  }

  if (tipo === "cliente") {
    await UserCliente.create({ nome, email });
    res.status(200).end();
    return;
  }

  await UserFuncionario.create({ nome, email });
  res.status(200).end();
  return;
}
