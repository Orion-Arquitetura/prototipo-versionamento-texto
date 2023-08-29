import Projeto from "@/database/models/projectModel";
import { sanitizeInputKeepUnderscoreAndNumbers } from "@/utils/sanitizeInput";
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

  const projetoName = `${new Date().getFullYear()}.${sanitizeInputKeepUnderscoreAndNumbers(nome)}`

  if (usuarios.length > 0) {
    const usuariosSemDuplicata: {
      nome: string;
      id: string;
      roles: Array<"lider" | "cliente" | "projetista" | "funcionario">;
    }[] = [];
  
    usuarios.forEach((user) => {
      const duplicateIndex = usuariosSemDuplicata.findIndex((usuario) => usuario.id === user.id)
  
      if (duplicateIndex !== -1) {
        usuariosSemDuplicata[duplicateIndex].roles = Array.from(new Set([...usuariosSemDuplicata[duplicateIndex].roles, ...user.roles]))
        return
      }
  
      usuariosSemDuplicata.push(user);
    });

    const novoProjeto = new Projeto({
      nome: projetoName,
      usuarios: usuariosSemDuplicata,
    });

    const usersCollection = mongoose.connection.collection("Users");

    const updateUsersOperations = usuariosSemDuplicata.map((user) => {
      return {
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(user.id) },
          update: {
            $addToSet: {
              projetos: {
                nome,
                id: novoProjeto._id,
                roles: user.roles,
              },
            },
          },
        },
      };
    });

    await usersCollection.bulkWrite(updateUsersOperations);

    await novoProjeto.save();

    res.status(200).end();

    return;
  }

  const novoProjeto = new Projeto({
    nome: projetoName,
  });

  await novoProjeto.save();

  res.status(200).end();
}
