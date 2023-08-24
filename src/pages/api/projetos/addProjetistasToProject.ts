import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { project, users } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(project._id);

  const projectLider = project.usuarios.find(
    (user: {
      nome: string;
      id: string;
      roles: Array<"funcionario" | "projetista" | "lider">;
    }) => user.roles.some((role) => role === "lider")
  );

  const isLiderInUsersList = users.some((user) => user.id === projectLider?.id);

  if (isLiderInUsersList) {
    const usersUpdates = users.map((user) => {
      if (user.id === projectLider.id) {
        return {
          updateOne: {
            filter: { _id: user.id, "projetos.id": projectObjectID },
            update: {
              $addToSet: { "projetos.$.roles": "projetista" },
            },
          },
        };
      }

      return {
        updateOne: {
          filter: { _id: user.id },
          update: {
            $addToSet: {
              projetos: {
                nome: project.nome,
                id: projectObjectID,
                roles: ["funcionario", "projetista"],
              },
            },
          },
        },
      };
    });

    await UserFuncionario.bulkWrite(usersUpdates);

    const projetoUpdates = users.map((user) => {
      if (user.id === projectLider.id) {
        return {
          updateOne: {
            filter: { _id: projectObjectID, "usuarios.id": new mongoose.Types.ObjectId(projectLider.id) },
            update: {
              $addToSet: { "usuarios.$.roles": "projetista" },
            },
          },
        };
      }

      user.roles = ["funcionario", "projetista"]

      return {
        updateOne: {
          filter: { _id: projectObjectID },
          update: {
            $addToSet: { usuarios: user },
          },
        },
      };
    });

    await Projeto.bulkWrite(projetoUpdates)

    res.status(200).end();

    return;
  }

  const usersObjects = users.map(user => {
    user.roles = ["funcionario", "projetista"]
  })

  const projeto = await Projeto.findOneAndUpdate(
    { _id: projectObjectID },
    {
      $addToSet: {
        usuarios: {
          $each: users,
        },
      },
    }
  );

  res.status(200).end();
}
