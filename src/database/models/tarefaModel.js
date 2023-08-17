import mongoose from "mongoose";

export const tarefaSchema = new mongoose.Schema({
    arquivoInicial: {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivos.files" },
        required: true
    },
    projeto: {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
        required: true
    },
    atribuidaPor: {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "UsuarioFuncionario" },
        required: true
    },
    responsavel: {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "UsuarioFuncionario" },
        required: true
    },
    prazo: {
        type: String,
        default: ""
    },
    finalizada: {
        type: Boolean,
        default: false,
        required: true
    },
    textoRequerimento: {
        type: String,
        required: true
    },
    textoResposta: {
        type: String,
        required: true
    },
    arquivoFinal: {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivos.files" },
        required: true
    },
})

export const Tarefa =
    mongoose.models.Tarefa ||
    mongoose.model("Tarefa", tarefaSchema, "Tarefas");