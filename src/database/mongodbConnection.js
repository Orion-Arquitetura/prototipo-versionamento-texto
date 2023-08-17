import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let cachedBucket;

async function connectToDatabase(dbname = "") {
  const uri = process.env.MONGO_URI.replace("{dbname}", dbname);

  if (mongoose.connection.readyState === 1) {
    console.log("Já está conectado");

    if (cachedBucket) {
      return { connection: mongoose.connection, bucket: cachedBucket };
    }

    cachedBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "Arquivos",
    });

    return { connection: mongoose.connection, bucket: cachedBucket };
  }

  console.log("Não está conectado");

  return await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected");
      mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected from MongoDB cluster");
      });
      cachedBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "Arquivos",
      });
      return { connection: mongoose.connection, bucket: cachedBucket };
    });
}

export default connectToDatabase;
