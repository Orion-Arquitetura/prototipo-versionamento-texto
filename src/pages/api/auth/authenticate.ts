//esta função pega o nome do projeto + nome da disciplina dentro do
//projeto e retorna os arquivos de versões daquele projeto + disciplina

import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/utils/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const { email, senha } = body;

  let user = users.find((user) => user.email === email && user.senha === senha);

  let userData = {
    nomeUsuario: user?.nomeUsuario,
    email: user?.email,
    permissoes: user?.permissoes,
    edicao: {
      estaEditando: user?.edicao.estaEditando,
      arquivos: user?.edicao.arquivos,
    },
  };

  if (user === undefined) {
    return res.status(404).end("Usuário não encontrado");
  }

  res.status(200).json(userData);
}
