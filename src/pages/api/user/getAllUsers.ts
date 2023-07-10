import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  try {
    const usersCollection = mongoose.connection.collection("Users");
    const data: any = await usersCollection.find({}).toArray().then(result => {
      return result.map(
        ({  _id, nome, email, tipo, projetos, dataCriacao }: any) => {
          return { _id, nome, email, tipo, projetos, dataCriacao };
        }
      );
    })
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
