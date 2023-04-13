import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (mongoose.connection.readyState === 0) {
        console.log("desconectado")
    }
  mongoose.disconnect();
  res.status(200).end();
}
