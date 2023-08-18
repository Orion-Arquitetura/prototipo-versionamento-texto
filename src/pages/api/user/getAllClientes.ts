import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const usersCollection = mongoose.connection.collection("Users")

    const clientes = await usersCollection.find({tipo: "cliente"}).toArray()

    res.status(200).json(clientes);
}