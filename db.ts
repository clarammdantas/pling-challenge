import mongoose from "mongoose";

const MONGO_USERNAME = "admin";
const MONGO_PASSWORD = "admin";
const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";
const MONGO_DB = "pling";

const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

mongoose.connect(process.env.MONGODB_URL || URL, { useNewUrlParser: true });
mongoose.connection.on('connected', function() {
    console.log("The db is connected.");
});
mongoose.connection.on('error', function() {
    console.log("The db connection failed.");
});
