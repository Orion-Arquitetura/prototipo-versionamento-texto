import Projeto from "@/database/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    Projeto.updateMany({}, {
        $pullAll: usuarios
    })
}