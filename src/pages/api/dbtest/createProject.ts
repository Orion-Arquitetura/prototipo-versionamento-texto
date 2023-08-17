import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Projeto.create({
    nome: "teste5",
  });

  res.status(200).end();
}
