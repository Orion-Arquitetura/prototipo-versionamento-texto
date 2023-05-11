import mongoose from "mongoose";

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