import connectToDatabase from "@/database/mongodbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { bucket } = await connectToDatabase("App");

    const { projectID, discipline } = req.query;

    const files = await bucket
      .find({
        "metadata.projeto.id": projectID,
        "metadata.disciplina": discipline,
      })
      .toArray();

    res.status(200).json(files);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
