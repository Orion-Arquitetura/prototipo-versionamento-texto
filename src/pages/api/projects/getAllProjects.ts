import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";
import { parseCookies } from "nookies";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase("App")
  
  const { "user-projetos": stringProjetos, "user-tipo": tipo } = parseCookies({
    req,
  });

  if (tipo === "administrador") {
    const data = await Projeto.find()
    .exec()
    .then((res) => res);
    
    res.status(200).json(data);
    return;
  }

  const projetos = JSON.parse(stringProjetos);
  
  const projectsIds = projetos.map((item:any) => item.id)
  
  const data = await Projeto.find({ _id: { $in: projectsIds } })
    .exec()
    .then((res) => res);
  res.status(200).json(data);
  return;
  // res.status(200).end()
}
