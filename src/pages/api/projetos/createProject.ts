import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import connectToDatabase from "@/database/mongodbConnection";
import { Document } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);

  if (!parsedBody.nome) {
    return res.status(400).json({ status: "Erro", message: "Nome inválido." });
  }

  await connectToDatabase("App");

  const newProject: Document = new Projeto({
    nome: parsedBody.nome,
  });

  await newProject
    .save()
    .then((response) => {
      res.status(201).json({ status: "Sucesso", message: "Criado com sucesso." });
      return response;
    })
    .catch((error) => {
      res.status(400).json({ status: "Erro", message: error });
      return error;
    });
}
