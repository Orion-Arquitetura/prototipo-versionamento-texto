import UserFuncionario from '@/database/models/userFuncionarioModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const funcionarios = await UserFuncionario.find({tipo: "funcionario"}).populate("projetos.projeto").exec()

    res.status(200).json(funcionarios);
}