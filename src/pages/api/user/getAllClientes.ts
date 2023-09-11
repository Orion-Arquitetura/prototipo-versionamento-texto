import UserCliente from "@/database/models/userClienteModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usersCollection = mongoose.connection.collection("Users");

    const clientes = await UserCliente.find({ tipo: "cliente" })
      .populate("projetos.projeto")
      .exec();

    res.status(200).json(clientes);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
