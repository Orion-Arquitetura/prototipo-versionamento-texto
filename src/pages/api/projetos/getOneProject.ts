import { NextApiRequest, NextApiResponse } from "next";
import Projeto from "@/database/models/projectModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  const data = await Projeto.findOne({ _id: id })
    .populate({
      path: "usuarios.lider usuarios.clientes usuarios.projetistas usuarios.outros",
      select: "-senha",
    })
    .exec()
    
  res.status(200).json(data);
}
