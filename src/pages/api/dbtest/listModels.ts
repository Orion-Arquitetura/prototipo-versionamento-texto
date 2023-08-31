import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const m = mongoose.connection.models

    console.log(m)

    res.status(200).end();
}