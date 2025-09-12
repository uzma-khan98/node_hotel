import 'dotenv/config';
import mongoose from 'mongoose';


//* Define the mongoDB connection URL
// const mongoDB_URL = 'mongodb://localhost:27017/hotels';
// const mongoURL = process.env.MONGODB_UR';
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/hotels';

//* set up mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

//* get the default connection,
//* Mongoose maintains a default connection object,representing the MongoDB connection
const db = mongoose.connection;

//* define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server...!');
});

db.on('err', () => {
    console.log('MongoDB Connection Error :', err);
});
db.on('disconnected', () => {
    console.log('Connecton break...');
})

//* Export the database connection
export default db;

