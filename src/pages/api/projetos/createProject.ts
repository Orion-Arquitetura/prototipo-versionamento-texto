import Projeto from "@/database/models/projectModel";
import { sanitizeInputKeepUnderscoreAndNumbers } from "@/utils/sanitizeInput";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
      return;
    }

    const { nome, lider, projetista, cliente } = JSON.parse(req.body);

    const usuarios = [lider, projetista, cliente].filter((user) => user !== null);

    const projetoName = `${new Date().getFullYear()}.${sanitizeInputKeepUnderscoreAndNumbers(
      nome
    )}`;

    if (usuarios.length > 0) {
      const usersCollection = mongoose.connection.collection("Users");

      const novoProjeto = new Projeto({
        nome: projetoName,
        usuarios: {
          lider: lider ? new mongoose.Types.ObjectId(lider.id) : null,
          projetistas: projetista ? [new mongoose.Types.ObjectId(projetista.id)] : [],
          clientes: cliente ? [new mongoose.Types.ObjectId(cliente.id)] : [],
        },
      });

      const usuariosUpdateOperations: any = usuarios.map((user) => {
        return {
          updateOne: {
            filter: {
              _id: new mongoose.Types.ObjectId(user.id),
            },
            update: {
              $addToSet: {
                projetos: {
                  projeto: novoProjeto._id,
                  roles: user.roles,
                },
              },
            },
          },
        };
      });

      await novoProjeto.save();
      await usersCollection.bulkWrite(usuariosUpdateOperations);

      res.status(200).end();
      return;
    }

    const novoProjeto = new Projeto({
      nome: projetoName,
    });

    await novoProjeto.save();
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
