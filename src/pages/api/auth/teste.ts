import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  const data = await db.collection("Usuarios").find({}).limit(2).toArray()

  res.json(data);
}
