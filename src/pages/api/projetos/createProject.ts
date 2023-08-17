import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { nome, lider, projetista, cliente } = JSON.parse(req.body);

  const ids = [lider.id, projetista.id, cliente.id].map(
    (id: string) => new mongoose.Types.ObjectId(id)
  );

  const novoProjeto = new Projeto({
    nome,
    lideres: [lider],
    projetistas: [projetista],
    clientesResponsaveis: [cliente],
    usuarios: [lider, projetista, cliente],
  });

  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.updateMany(
    { _id: { $in: ids } },
    {
      $push: { projetos: { nome, id: novoProjeto._id } },
    }
  );

  await novoProjeto.save();

  res.status(200).end();
}
