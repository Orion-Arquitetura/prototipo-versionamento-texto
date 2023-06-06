import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  try {
    const usersCollection = mongoose.connection.collection("Users");
    const data: any = await usersCollection.find({}).toArray().then(res => {
      return res.map(
        ({ email, nome, permissoes, tipo, _id }: any) => {
          return { email, nome, permissoes, tipo, _id };
        }
      );
    })
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
