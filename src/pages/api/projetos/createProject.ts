import Projeto from "@/database/models/projectModel";
import { User } from "@/utils/types";
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

  const usuarios = [lider, projetista, cliente].filter((user) => user !== null);

  const usuariosSemDuplicata: { nome: string; id: string }[] = [];

  usuarios.forEach((user) => {
    if (usuariosSemDuplicata.find((usuario) => usuario.id === user.id)) {
      return;
    }

    usuariosSemDuplicata.push(user);
  });

  if (usuariosSemDuplicata.length > 0) {
    const ids = usuariosSemDuplicata.map(
      ({ id }: { nome: string; id: string }) =>
        new mongoose.Types.ObjectId(id)
    );

    const novoProjeto = new Projeto({
      nome,
      lider: lider === null ? "" : lider,
      projetistas: projetista === null ? [] : [projetista],
      clientesResponsaveis: cliente === null ? [] : [cliente],
      usuarios: usuariosSemDuplicata,
    });

    const usersCollection = mongoose.connection.collection("Users");

    await usersCollection.updateMany(
      { _id: { $in: ids } },
      {
        $addToSet: { projetos: { nome, id: novoProjeto._id } },
      }
    );

    await novoProjeto.save();

    res.status(200).end();

    return;
  }

  const novoProjeto = new Projeto({
    nome,
  });

  await novoProjeto.save();

  res.status(200).end();
}
