import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const arquivosCollection = mongoose.connection.collection("Arquivos.files");

  const data = await arquivosCollection.findOne({
    _id: new mongoose.Types.ObjectId(id as string),
  });

  res.status(200).json(data);
}
