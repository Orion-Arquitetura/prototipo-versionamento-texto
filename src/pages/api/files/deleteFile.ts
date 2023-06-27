import Arquivo from "@/database/models/arquivoModel";
import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId, projectId } = JSON.parse(req.body);

  await Arquivo.deleteOne({ _id: fileId });
  await Projeto.updateOne({ _id: projectId }, { $pull: { arquivos: fileId } });

  res.status(200).end();
}
