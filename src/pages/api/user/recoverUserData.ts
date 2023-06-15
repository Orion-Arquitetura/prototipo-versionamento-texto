import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const filter = new ObjectId(req.body);
    const usersCollection = mongoose.connection.collection("Users");
    const userData = (await usersCollection.findOne(filter).then((res) => res)) as {
      nome: string;
      email: string;
      tipo: string;
      _id: ObjectId;
    };

    res.status(200).json({
      usuario: {
        nome: userData.nome,
        email: userData.email,
        tipo: userData.tipo,
        id: userData._id,
      },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
