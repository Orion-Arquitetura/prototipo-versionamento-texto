import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log("ok")
  res.status(200).end();
}
