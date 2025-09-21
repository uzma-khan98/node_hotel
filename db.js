import "dotenv/config";
import mongoose from "mongoose";

//* Define the mongoDB connection URL
// * local
const mongoURL = process.env.MONGODB_URL_LOCAL;
// * connection on Atlas || local
// const mongoURL = process.env.MONGODB_URL || 'MONGODB_URL_LOCAL';

//* set up mongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//* get the default connection,
//* Mongoose maintains a default connection object,representing the MongoDB connection
const db = mongoose.connection;

//* define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server/local...!");
});

db.on("err", () => {
  console.log("MongoDB Connection Error :", err);
});
db.on("disconnected", () => {
  console.log("Connecton break...");
});

//* Export the database connection
export default db;
