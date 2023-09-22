import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  destroyCookie({ res }, "nome", { path: "/" });
  destroyCookie({ res }, "token", { path: "/" });
  destroyCookie({ res }, "email", { path: "/" });
  destroyCookie({ res }, "id", { path: "/" });
  destroyCookie({ res }, "tipo", { path: "/" });
  destroyCookie({ res }, "projetos", { path: "/" });
  destroyCookie({ res }, "tarefas", { path: "/" });

  res.status(200).end();
}
