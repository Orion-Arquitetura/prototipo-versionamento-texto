import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  if (
    userId !== parseCookies({ req })["user-id"] &&
    parseCookies({ req })["user-tipo"] !== "administrador"
  ) {
    res.status(403).end();
    return;
  }

  const usersCollection = mongoose.connection.collection("Users");

  const userData = await usersCollection.findOne({
    _id: new mongoose.Types.ObjectId(userId as string),
  });

  delete userData!.senha;

  res.status(200).json(userData);
}
