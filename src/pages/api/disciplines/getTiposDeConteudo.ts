import TiposDeConteudo from "@/database/models/tiposDeConteudoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await TiposDeConteudo.find({});

  res.status(200).json(data);
}
