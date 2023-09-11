import { NextApiRequest, NextApiResponse } from "next";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import UserAdministrador from "@/database/models/userAdministradorModel";
import UserCliente from "@/database/models/userClienteModel";
import connectToDatabase from "@/database/mongodbConnection";
import { sanitizeEmail, sanitizeInputKeepOnlyLettersAndSpaces } from "@/utils/sanitizeInput";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase("App");

    const {
      nome,
      email,
      tipo,
    }: {
      nome: string;
      email: string;
      tipo: "administrador" | "cliente" | "funcionario";
    } = JSON.parse(req.body);

    const sanitizedEmail = sanitizeEmail(email);

    if (!sanitizedEmail) {
      throw new Error("Email inválido");
    }

    if (tipo === "administrador") {
      const user = await UserAdministrador.create({
        nome: sanitizeInputKeepOnlyLettersAndSpaces(nome),
        email: sanitizedEmail,
      }).then((result) => result);
      delete user.senha;
      res.status(200).json(user);
      return;
    }

    if (tipo === "cliente") {
      const user = await UserCliente.create({
        nome: sanitizeInputKeepOnlyLettersAndSpaces(nome),
        email: sanitizedEmail,
      }).then((result) => result);
      delete user.senha;
      res.status(200).json(user);
      return;
    }

    if (tipo === "funcionario") {
      const user = await UserFuncionario.create({
        nome: sanitizeInputKeepOnlyLettersAndSpaces(nome),
        email: sanitizedEmail,
      }).then((result) => result);
      delete user.senha;
      res.status(200).json(user);
      return;
    }
  } catch (e: any) {
    res.status(400).json({ erro: e.message });
  }

  res.status(400).end();
}
