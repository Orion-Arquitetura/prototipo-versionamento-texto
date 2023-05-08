import { NextApiRequest, NextApiResponse } from "next";
import Cliente from "@/database/models/userClienteModel";
import connectToDatabase from "@/database/mongodbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase("Usuarios");
  try {
      const body = JSON.parse(req.body);
      const novo_cliente = new Cliente(body);
      const novo_cliente_dados = novo_cliente.save().then((result:any) => result);
      res.status(200).json(JSON.stringify(novo_cliente_dados))
      return
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
    return
  }
}