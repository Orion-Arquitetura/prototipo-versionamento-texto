import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../utils/mongodb";
import { v4 as uuid } from "uuid";
import User from "@/utils/userModel";

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
  connectToDatabase();
  const { email, senha } = JSON.parse(req.body);

  const query = User.findOne({email, senha}).exec()
  const userData = await query.then(res => res)

  console.log("Authenticate")

  if (!userData) {
    res.status(404).json(new Error("Não encontrado."))
  }

  res.status(200).json({
    usuario: { userName: userData.userName, email: userData.email },
    token: uuid(),
  });
}
