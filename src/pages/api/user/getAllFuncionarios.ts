import UserFuncionario from '@/database/models/userFuncionarioModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const funcionarios = await UserFuncionario.find({tipo: "funcionario"}).populate("projetos.projeto").exec()

        res.status(200).json(funcionarios);
    } catch(e) {
        console.log(e)
        res.status(500).end()
    }
}