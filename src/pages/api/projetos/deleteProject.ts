import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body;

  const { bucket } = await connectToDatabase("App");

  const projetoDeletado = await Projeto.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  }).exec();

  const projetoDeletadoUsersIds = projetoDeletado.usuarios.map(
    (usuario: { nome: string; id: string }) => usuario.id
  );

  const projetoDeletadoFilesIds = projetoDeletado.arquivos.map(
    (arquivo: any) => arquivo._id
  );

  if (projetoDeletadoFilesIds.length > 0) {
    await bucket.deleteMany({_id: {$in: projetoDeletadoFilesIds}})
  }

  if (projetoDeletadoUsersIds.length > 0) {
    const usersCollection = mongoose.connection.collection("Users");
    usersCollection.updateMany(
      { _id: { $in: projetoDeletadoUsersIds } },
      {
        $pull: { projetos: { id: projetoDeletado._id } },
      }
    );
  }

  res.status(200).end();
}
