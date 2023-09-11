import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import connectToDatabase from "@/database/mongodbConnection";
import { v4 as uuid } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
      return;
    }

    const { email, senha } = JSON.parse(req.body);

    if (!email || !senha) {
      res.status(400).end();
      return;
    }

    await connectToDatabase("App");

    const usersCollection = mongoose.connection.collection("Users");

    const user = await usersCollection.findOne({ email, senha }, { projection: { senha: 0 } });

    if (user === null) {
      res.status(400).json({ erro: "Usuário não existe ou credenciais incorretas." });
      return;
    }

    user.token = uuid();

    res.status(200).json({ userData: user });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
