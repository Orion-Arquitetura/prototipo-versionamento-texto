import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newEmail, user } = JSON.parse(req.body);

    const cookiesUserID = parseCookies({ req })["id"];

    if (user._id !== cookiesUserID) {
      res.status(403).end();
      return;
    }

    const usersCollection = mongoose.connection.collection("Users");

    await usersCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(user._id) },
      { $set: { email: newEmail } }
    );

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
