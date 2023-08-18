import ConteudosDeArquivo from "@/database/models/conteudosDeArquivoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await ConteudosDeArquivo.find();

  res.status(200).json(data);
}