import { NextApiRequest, NextApiResponse } from "next";
import Arquivo from "@/database/models/arquivoModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  try {
    const reqData = JSON.parse(req.body)

    console.log(reqData)
    // const newFile = new Arquivo({

    // })

    // const newFileData = await newFile.save()

    res.status(200).json({
        // data: newFileData
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
