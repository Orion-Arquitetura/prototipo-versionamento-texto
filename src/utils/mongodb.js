// const { MongoClient } = require('mongodb');
// const uri = process.env.MONGO_URI;

// if (!uri) {
//     throw new Error("Sem URI")
// }

// let cached = global.mongo

// if (!cached) {
//     cached = global.mongo = {connection: null, promise: null}
// }

// export async function connectToDatabase() {
//     if (cached.connection) {
//         return cached.connection
//     }

//     if (!cached.promise) {
//         const opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }

//         cached.promise = await MongoClient.connect(uri, opts).then(client => {
//             return {
//                 client,
//                 db: client.db("Usuarios")
//             }
//         })
//     }

//     cached.connection = await cached.promise
//     return cached.connection
// }
/////////////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (mongoose.connection.readyState === 1) {
    console.log("Já está conectado");
    return mongoose.connection;
  } else {
    console.log("Não está conectado");
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("Connected");

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB cluster');
      })

      return mongoose.connection;
    } catch (error) {
      console.log("Error: " + error);
      throw error;
    }
  }
}

export default connectToDatabase;
/////////////////////////////////////////////////////////////////////////////////////////
// const mongoose = require('mongoose');
// const { MONGO_URI } = process.env;

// // create a connection to the MongoDB cluster
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });

// // get a reference to the default connection
// const db = mongoose.connection;

// // handle connection events
// db.on('error', (error) => {
//   console.error(`Mongoose connection error: ${error}`);
// });

// db.once('open', () => {
//   console.log('Mongoose connected to MongoDB cluster');
// });

// db.on('disconnected', () => {
//   console.log('Mongoose disconnected from MongoDB cluster');
// });

// process.on('SIGINT', async () => {
//   await mongoose.connection.close().then(() => console.log("closed"));
//   process.exit(0);
// });


// export default db