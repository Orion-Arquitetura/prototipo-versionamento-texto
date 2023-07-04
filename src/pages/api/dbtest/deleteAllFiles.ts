import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connection.collection("Arquivos").deleteMany({});
  await Projeto.updateMany({}, {$unset: {"arquivos": ""}})

  res.status(200).end();
}
