import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/database/mongodbConnection";
import Arquivo from "@/database/models/arquivoModel";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const arquivos = await Arquivo.find({ "projeto.id": req.body }).exec();
    if (arquivos.length === 0) {
      await Projeto.findById(req.body)
        .exec()
        .then((result) => {
          res.status(200).json({ projectName: result.nome });
        });
    } else {
      res.status(200).json(arquivos);
    }
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
