import { NextApiRequest, NextApiResponse } from "next";
import Pasta from "@/database/models/pastaModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const data = await Pasta.findOne().exec().then(res => res)

  res.status(200).json(data);
}
