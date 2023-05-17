import { NextApiRequest, NextApiResponse } from "next";
import User from "@/database/models/userModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const userData = await User.findById(req.body).exec();

    res.status(200).json({
      usuario: { nome: userData.nome, email: userData.email, nivel: userData.nivel, id: userData._id }
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
