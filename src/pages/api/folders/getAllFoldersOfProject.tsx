import { NextApiRequest, NextApiResponse } from "next";
import Pasta from "@/database/models/pastaModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  // const parsedBody = JSON.parse(req.body)
  console.log(req.query)

  const data = await Pasta.find().exec().then(res => res)

  res.status(200).json(data);
}
