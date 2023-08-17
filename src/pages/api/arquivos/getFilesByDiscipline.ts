import connectToDatabase from "@/database/mongodbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("getFilesByDiscipline");

  const { bucket } = await connectToDatabase("App");

  const { projectID, discipline } = req.query;

  const files = await bucket
    .find({
      "metadata.projeto.id": projectID,
      "metadata.disciplina": discipline,
    })
    .toArray();

  console.log("getFilesByDiscipline Files: " + files.length);

  res.status(200).json(files);
}
