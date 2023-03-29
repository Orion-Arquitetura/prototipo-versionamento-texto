import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { v4 as uuid } from "uuid";

type ResponseDataType = {
  token: string;
  usuario: {
    userName: string;
    email: string;
  };
} | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) {
  const { db } = await connectToDatabase();
  const { email, senha } = JSON.parse(req.body);

  const userData = await db.collection("Usuarios").find({ email, senha }).toArray();

  console.log("Authenticate")

  if (!userData) {
    res.status(404).json(new Error("Não encontrado."))
  }

  res.status(200).json({
    usuario: { userName: userData[0].userName, email: userData[0].email },
    token: uuid(),
  });
}
