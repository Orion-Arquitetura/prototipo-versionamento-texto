import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
  const projeto = JSON.parse(req.body);

  const usuarios = [
    projeto.usuarios.lider,
    ...projeto.usuarios.projetistas,
    ...projeto.usuarios.clientes,
    ...projeto.usuarios.outros,
  ]
    .filter((user) => user !== null)
    .map((user) => new mongoose.Types.ObjectId(user._id));

  const { bucket } = await connectToDatabase("App");

  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.updateMany(
    { _id: { $in: usuarios } },
    {
      $pull: { projetos: { projeto: new mongoose.Types.ObjectId(projeto._id) } as any },
    }
  );

  await Projeto.deleteOne({_id: projeto._id})

  const files = await bucket.find({ "metadata.projeto.id": projeto._id }).toArray();
  const deletePromises:any = [];
  await files.forEach(async (file:any) => {
    deletePromises.push(bucket.delete(file._id));
  });

  await Promise.all(deletePromises);

  res.status(200).end();
} catch(e) {
  console.log(e)
  res.status(500).end()
}
}
