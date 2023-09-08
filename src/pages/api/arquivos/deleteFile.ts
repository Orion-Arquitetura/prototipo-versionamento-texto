import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileID, projectID } = req.query;

  const { bucket } = await connectToDatabase();

  const arquivosCollection = mongoose.connection.collection("Arquivos.files");

  const arquivo = await arquivosCollection.findOne({
    _id: new mongoose.Types.ObjectId(fileID as string),
  });

  await arquivosCollection.updateOne(
    { "metadata.versao": arquivo!.metadata.versao - 1 },
    {
      $set: { "metadata.ultimaVersao": true },
    }
  );

  await bucket.delete(new mongoose.Types.ObjectId(fileID as string));

  await Projeto.updateOne(
    { _id: new mongoose.Types.ObjectId(projectID as string) },
    {
      $pull: {
        arquivos: { id: new mongoose.Types.ObjectId(fileID as string) },
      },
    }
  );

  res.status(200).end();
}
