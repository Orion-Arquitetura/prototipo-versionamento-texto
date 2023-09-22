import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });

  if (cookies.token === undefined) {
    res.status(400).end()
    return
  }

  res.status(200).json(cookies);
}
