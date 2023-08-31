import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = mongoose.connection.collection("users");
  await users.updateMany({}, { $pull: {tarefas: {}} });

  res.status(200).end();
}
