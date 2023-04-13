import { NextApiRequest, NextApiResponse } from "next";
import User from "@/utils/userModel";
import connectToDatabase from "@/utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).end();
  }

  connectToDatabase();

  const { nome, email, senha } = JSON.parse(req.body);

  const newUser = new User({ userName: nome, email, senha, nivel: "user" });
  console.log(newUser);
  newUser.save();

  res.status(200).end();
}
