import Projeto from "@/database/models/projectModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const usersCollection = mongoose.connection.collection("Users");

  await usersCollection.updateMany({}, { $pull: { projetos: {} } });

  await Projeto.updateMany(
    {},
    {
      $pull: { usuarios: {} },
    }
  );

  res.status(200).end();
}
