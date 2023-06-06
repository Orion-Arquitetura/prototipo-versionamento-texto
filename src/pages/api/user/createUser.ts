import { NextApiRequest, NextApiResponse } from "next";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const { nome, email } = JSON.parse(req.body);

  try {
    const newUser = new UserFuncionario({nome, email, permissoes: {
        projetos: [],
        arquivos: []
    }})

    await newUser.save()

    res.status(200).json({
      ...newUser,
      token: uuid(),
    });
    res.status(200).end()
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
