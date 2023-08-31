import Projeto from '@/database/models/projectModel';
import Tarefa from '@/database/models/tarefaModel';
import { RadioButtonCheckedTwoTone } from '@mui/icons-material';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const users = mongoose.connection.collection("Users") 

    await users.deleteMany({})
    await Projeto.deleteMany({})
    await Tarefa.deleteMany({})

    res.status(200).end();
}