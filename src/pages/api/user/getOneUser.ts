import UserCliente from "@/database/models/userClienteModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id;
    const userType = req.query.type;

    if (
      userId !== parseCookies({ req })["id"] &&
      parseCookies({ req })["tipo"] !== "administrador"
    ) {
      res.status(403).end();
      return;
    }

    if (userType === "cliente") {
      const userData = await UserCliente.findOne({
        _id: new mongoose.Types.ObjectId(userId as string),
      })
        .populate({ path: "projetos.projeto", select: "-senha" })
        .exec();
      res.status(200).json(userData);
      return;
    }

    const userData = await UserFuncionario.findOne({
      _id: new mongoose.Types.ObjectId(userId as string),
    })
      .populate({ path: "projetos.projeto", select: "-senha" })
      .populate({
        path: "tarefas",
        populate: [{ path: "projeto" }, { path: "atribuidaPor", select: "-senha" }],
      })
      .exec();

    res.status(200).json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
