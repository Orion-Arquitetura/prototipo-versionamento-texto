import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const data = await Projeto.find().exec().then(res => res)

  res.status(200).json(data);
}
