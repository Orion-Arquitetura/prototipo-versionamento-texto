import EtapasDeProjeto from "@/database/models/etapasDoProjetoModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await EtapasDeProjeto.find();

  res.status(200).json(data);
}
