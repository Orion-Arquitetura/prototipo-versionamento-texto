import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(mongoose.modelNames());
  console.log(mongoose.connection.deleteModel("Cliente"))
  console.log(mongoose.modelNames());

  console.log("oks")
  res.status(200).end();
}
