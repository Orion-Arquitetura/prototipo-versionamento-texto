
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("Sem URI")
}

let cached = global.mongo

if (!cached) {
    cached = global.mongo = {connection: null, promise: null}
}

export async function connectToDatabase() {
    if (cached.connection) {
        return cached.connection
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        cached.promise = await MongoClient.connect(uri, opts).then(client => {
            return {
                client, 
                db: client.db("Usuarios")
            }
        })
    }

    cached.connection = await cached.promise
    return cached.connection
}

