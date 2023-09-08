import Disciplina from "@/database/models/disciplinaModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await Disciplina.find({});

  res.status(200).json(data);
}
