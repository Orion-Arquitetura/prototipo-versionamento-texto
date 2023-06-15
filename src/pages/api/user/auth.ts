import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const { email, senha } = JSON.parse(req.body);

  try {
    const usersCollection = mongoose.connection.collection("Users");
    await usersCollection
      .findOne({
        email: email,
        senha: senha,
      })
      .then((result: any) => {
        res.status(200).json({
          nome: result.nome,
          email: result.email,
          tipo: result.tipo.toLowerCase(),
          id: result._id,
          token: uuid(),
        });
      });

    return;
  } catch (e) {
    console.log(e);
    res.status(401).json({ Erro: "Dados incorretos." });
    return;
  }
}
