import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const cookies = parseCookies({ req });

  await connectToDatabase("App")

  if (cookies.tipo === "administrador") {
    const projetos = await Projeto.find().exec();
    res.status(200).json(projetos);
    return;
  }

  const projetosPermitidos = JSON.parse(cookies.projetos).map(
    (projeto: { nome: string; id: string }) => projeto.id
  );

  const projetos = await Projeto.find({
    _id: { $in: projetosPermitidos },
  }).exec();

  res.status(200).json(projetos);
}
