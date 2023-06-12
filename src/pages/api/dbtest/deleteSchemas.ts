import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Arquivo from "@/database/models/arquivoModel";
import { UserAdministrador } from "@/database/models/userAdministradorModel"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log(mongoose.modelNames());
  // const nome = req.query.q as string | RegExp
  mongoose.deleteModel("Arquivo")
  console.log(mongoose.modelNames());
  // console.log("oks")

  res.status(200).end();
}
