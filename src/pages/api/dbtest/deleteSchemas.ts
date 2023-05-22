import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(mongoose.modelNames());
  const nome = req.query.q as string | RegExp
  mongoose.deleteModel(nome)
  console.log(mongoose.modelNames());
  console.log("oks")
  res.status(200).end();
}
