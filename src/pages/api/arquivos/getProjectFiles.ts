import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { bucket } = await connectToDatabase("App");

    const arquivos = await bucket.find({ "metadata.projeto.id": req.query.projectID }).toArray();

    if (arquivos.length === 0) {
      const projeto = await Projeto.findOne({
        _id: new mongoose.Types.ObjectId(req.query.projectID as string),
      });
      return res.status(200).json({ projectName: projeto.nome });
    }

    return res.status(200).json(arquivos);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
