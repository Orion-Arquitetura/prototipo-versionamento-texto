import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const result = await Projeto.deleteOne({ nome: req.body }).then((res) => res);
  console.log(result);

  res.status(200).json({});
}
