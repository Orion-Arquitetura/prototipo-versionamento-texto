import TiposDeConteudo from "@/database/models/tiposDeConteudoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await TiposDeConteudo.find({});

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
