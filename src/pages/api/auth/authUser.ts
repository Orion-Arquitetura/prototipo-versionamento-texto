import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import connectToDatabase from "@/database/mongodbConnection";
import { v4 as uuid } from "uuid";
import { setCookie } from "nookies";

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

    const cookiesToSet = [
      { name: "token", value: user.token },
      { name: "email", value: user.email },
      { name: "nome", value: user.nome },
      { name: "id", value: user._id.toString() },
      { name: "tipo", value: user.tipo },
      { name: "projetos", value: JSON.stringify(user.projetos || []) },
      { name: "tarefas", value: JSON.stringify(user.tarefas || []) },
    ];

    // Loop through the cookies and set them using setCookie
    cookiesToSet.forEach((cookie) => {
      setCookie({ res }, cookie.name, cookie.value, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, 
        sameSite: "None",
        secure: true
      });
    });

    res.status(200).json({ userData: user });
  } catch (e) {
    res.status(500).end();
  }
}
