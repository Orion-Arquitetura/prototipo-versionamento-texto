import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fileID, projectID } = req.query;

  const { bucket } = await connectToDatabase();

  await bucket.delete(new mongoose.Types.ObjectId(fileID as string));

  await Projeto.updateOne(
    { _id: new mongoose.Types.ObjectId(projectID as string) },
    {
      $pull: {
        arquivos: { id: new mongoose.Types.ObjectId(fileID as string) },
      },
    }
  );

  res.status(200).end();
}
