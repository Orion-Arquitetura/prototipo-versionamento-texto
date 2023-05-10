const mongoose = require("mongoose");

async function connectToDatabase(dbname = "") {
  const uri = process.env.MONGO_URI.replace("{dbname}", dbname);

  if (mongoose.connection.readyState === 1) {
    console.log("Já está conectado");
    return mongoose.connection;
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
      return mongoose.connection;
    });
}

export default connectToDatabase;