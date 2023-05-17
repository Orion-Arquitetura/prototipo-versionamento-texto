import { NextApiRequest, NextApiResponse } from "next";
import Pasta from "@/database/models/pastaModel";
import connectToDatabase from "@/database/mongodbConnection";
import { Document } from "mongoose";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("App");

  const parsedBody = JSON.parse(req.body);

  console.log(parsedBody)

  const project = await Projeto.findById(parsedBody.projectId)

  console.log(project)

  const novaPasta: Document = new Pasta({
    nome: parsedBody.nome,
    projeto: project._id
  })

  await novaPasta.save().then(async(res) => {
    project.pastas.push(res._id)
    await project.save()
  })

  res.status(200).json({ok: "ok"});
}
