import mongoose from "mongoose";

//NO FUTURO (BEM NO FUTURO) SERÁ IMPORTANTE CRIAR O REGISTRO DE UMA SESSION NO BANCO DE DADOS POR QUESTÕES DE SEGURANÇA

const sessionSchema = mongoose.Schema({
    sessionToken: {
        type: string,
        required: true,
        unique: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: string,
        required: true
    }
})