import { NextApiRequest, NextApiResponse } from "next";
import User from "@/database/models/userModel";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const { email, senha } = JSON.parse(req.body);

  try {
    const userData = await User.findOne({
      email: email,
      senha: senha,
    }).exec();

    res.status(200).json({
      usuario: { nome: userData.nome, email: userData.email, nivel: userData.nivel, id: userData._id },
      token: uuid(),
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
