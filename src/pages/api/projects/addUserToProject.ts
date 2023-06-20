import connectToDatabase from "@/database/mongodbConnection";
import mongoose from "mongoose";
import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  try {
    const { usersData, projectData } = JSON.parse(req.body);

    //para adicionar varios usuarios a um projeto:
    const usersCollection = mongoose.connection.collection("Users");

    const updateUserOperations = usersData.map((user: any) => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(user.id) },
        update: { $push: { "permissoes.projetos": projectData } },
      },
    }));

    await usersCollection.bulkWrite(updateUserOperations);

    //e entao adicionar o id do(s) usuário(s) no projeto

    const updateProjectOperations = usersData.map((user: any) => {
      return ({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(projectData.id) },
          update: { $push: { usuarios: user } },
        },
      });
    });

    await Projeto.bulkWrite(updateProjectOperations);

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
