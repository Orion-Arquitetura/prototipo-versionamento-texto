import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../utils/mongodb";
import User from "@/utils/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();

  const email = req.body;

  const query = User.findOne({ email }).exec();
  const userData = await query.then((res) => res);

  console.log("Recover data");

  res
    .status(200)
    .json({ usuario: { userName: userData.userName, email: userData.email } });
}
