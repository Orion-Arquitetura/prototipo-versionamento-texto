import EtapasDeProjeto from "@/database/models/etapasDoProjetoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await EtapasDeProjeto.find({});

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
