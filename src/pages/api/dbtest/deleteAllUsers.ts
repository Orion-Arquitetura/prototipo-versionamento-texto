import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connection.collection("Users").deleteMany({});


  res.status(200).end();
}
