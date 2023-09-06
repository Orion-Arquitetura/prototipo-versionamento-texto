import UserAdministrador from "@/database/models/userAdministradorModel";
import UserCliente from "@/database/models/userClienteModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await UserAdministrador.create({
    nome: "Admin",
    email: "admin@orion.com"
  });

  await UserFuncionario.create({
    nome: "Jp",
    email: "jp@orion.com",
  });

  await UserFuncionario.create({
    nome: "Marcos",
    email: "m@orion.com",
  });

  await UserFuncionario.create({
    nome: "Gabriela",
    email: "g@orion.com",
  });

  await UserFuncionario.create({
    nome: "Walter",
    email: "w@orion.com",
  });

  await UserCliente.create({
    nome: "Cliente Um",
    email: "c1@gmail.com",
  });

  await UserCliente.create({
    nome: "Cliente Dois",
    email: "c2@gmail.com",
  });

  await UserCliente.create({
    nome: "Cliente Tres",
    email: "c3@gmail.com",
  });

  await UserCliente.create({
    nome: "Cliente Quatro",
    email: "c4@gmail.com",
  });

  res.status(200).end();
}
