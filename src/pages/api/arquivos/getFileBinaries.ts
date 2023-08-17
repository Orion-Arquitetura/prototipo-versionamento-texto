import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { bucket } = await connectToDatabase("App");

  const file = await bucket
    .find({ _id: new mongoose.Types.ObjectId(id as string) })
    .toArray();

  res.setHeader("Content-Type", "application/pdf");

  bucket
    .openDownloadStream(new mongoose.Types.ObjectId(id as string))
    .pipe(res);
}
