import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const models = mongoose.modelNames()

  console.log(models)

  models.forEach(model => mongoose.deleteModel(model))
  console.log(models)

  res.status(200).end();
}
