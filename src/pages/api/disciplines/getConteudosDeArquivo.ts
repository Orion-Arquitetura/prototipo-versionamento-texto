import ConteudosDeArquivo from "@/database/models/conteudosDeArquivoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await ConteudosDeArquivo.find({});

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
