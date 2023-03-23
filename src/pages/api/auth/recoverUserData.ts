import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  const email = req.body;

  const userData = await db.collection("Usuarios").find({email}).toArray();

  console.log("Recover data")

  res.status(200).json({usuario: { userName: userData[0].userName, email: userData[0].email }});
}
