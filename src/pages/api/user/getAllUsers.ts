import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const usersCollection = mongoose.connection.collection("Users");
    const data: any = await usersCollection.find({}).toArray().then(result => {
      return result.map(
        (userData: any) => {
          delete userData.senha
          return userData;
        }
      );
    })
    res.status(200).json(data);
  } catch (e) {
    res.status(500).end();
  }
}
