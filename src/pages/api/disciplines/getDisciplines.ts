import Disciplina from "@/database/models/disciplinaModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await Disciplina.find({});
  
    res.status(200).json(data);
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
}
