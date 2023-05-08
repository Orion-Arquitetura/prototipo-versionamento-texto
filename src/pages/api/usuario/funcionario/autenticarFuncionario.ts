import { NextApiRequest, NextApiResponse } from "next";
import Funcionario from "@/database/models/userFuncionarioModel";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("Usuarios");
  const body = JSON.parse(req.body);

  try {
    const { nome, email, nivel } = await Funcionario.findOne({
      email: body.email,
      senha: body.senha,
    }).exec();

    res.status(200).json({
      usuario: { nome, email, nivel },
      token: uuid(),
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
