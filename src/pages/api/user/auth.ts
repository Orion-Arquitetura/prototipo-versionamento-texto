import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const { email, senha } = JSON.parse(req.body);

  try {
    const usersCollection = mongoose.connection.collection("Users");
    const user = await usersCollection
      .findOne({
        email: email,
        senha: senha,
      })
      .then((result: any) => result);

    if (user === null) {
      throw new Error("Usuário não existe")
    } else {
      console.log(user)
      res.status(200).json({
        nome: user.nome,
        email: user.email,
        tipo: user.tipo.toLowerCase(),
        id: user._id,
        token: uuid(),
        permissoes: user.permissoes
      });
    }

    return;
  } catch (e) {
    res.status(401).json(e);
    return;
  }
}
