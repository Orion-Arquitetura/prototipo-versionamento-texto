import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  console.log(id)
  const data = await Projeto.findOne({ _id: id })
    .exec()
    .then((res) => res);
  res.status(200).json(data);
}
