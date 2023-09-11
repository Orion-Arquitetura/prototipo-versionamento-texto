import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

  const arquivosCollection = mongoose.connection.collection("Arquivos.files");

  const data = await arquivosCollection.findOne({
    _id: new mongoose.Types.ObjectId(id as string),
  });

  const projetoData = await Projeto.findOne({ _id: data!.metadata.projeto.id })
    .populate("usuarios.lider usuarios.projetistas usuarios.outros")
    .exec();
    
  data!.metadata.projeto = projetoData;

  res.status(200).json(data);
  } catch(e) {
    console.log(e)
    res.status(500).end()
  }
}
