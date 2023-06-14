import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import { UserAdministrador } from "@/database/models/userAdministradorModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const usersCollection = mongoose.connection.collection("Users");

  const admin = new UserAdministrador({
    nome: "Admin",
    email: "admin@orion.com"
  })

  await admin.save()

  res.status(200).end();
}
