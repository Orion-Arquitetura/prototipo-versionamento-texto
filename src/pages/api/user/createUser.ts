import { NextApiRequest, NextApiResponse } from "next";
import { UserFuncionario } from "@/database/models/userFuncionarioModel";
import { v4 as uuid } from "uuid";
import connectToDatabase from "@/database/mongodbConnection";
import { UserAdministrador } from "@/database/models/userAdministradorModel";
import { UserCliente } from "@/database/models/userClienteModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const { nome, email, tipo } = JSON.parse(req.body);

  try {
    switch (tipo) {
      case "funcionario":
        (async () => {
          const newUser = new UserFuncionario({
            nome,
            email,
            permissoes: {
              projetos: [],
              arquivos: [],
            },
          });

          await newUser.save();

          res.status(200).json({
            ...newUser,
            token: uuid(),
          });
        })();
        break;
      case "cliente":
        (async () => {
          const newUser = new UserCliente({
            nome,
            email,
            permissoes: {
              projetos: [],
              arquivos: [],
            },
          });

          await newUser.save();

          res.status(200).json({
            ...newUser,
            token: uuid(),
          });
        })();
        break;
      case "administrador":
        (async () => {
          const newUser = new UserAdministrador({
            nome,
            email,
            permissoes: {
              projetos: [],
              arquivos: [],
            },
          });

          await newUser.save();

          res.status(200).json({
            ...newUser,
            token: uuid(),
          });
        })();
        break;

      default:
        break;
    }

    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ Erro: e });
    return;
  }
}
