import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const newProject = new Projeto({
    nome: req.body,
  });

  newProject.save();

  res.status(201).json({ status: "Criado com sucesso." });
}
