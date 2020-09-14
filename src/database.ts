import mongoose from 'mongoose';

// This provides us information to connect with a local db.
import DataBaseAuth from './databaseSecrets';


class DataBase {
    dbAuth: DataBaseAuth;
    url: string;

    constructor() {
        this.dbAuth = new DataBaseAuth();
        this.url = process.env.MONGODB_URL || this.dbAuth.url;
    }

    connect() {
        mongoose.connect(this.url, { useNewUrlParser: true });
        mongoose.connection.on('connected', function () {
            console.log("Connection with the db established.");
        });
        mongoose.connection.on('error', function() {
            console.log("The connection with the db failed.");
        });
    }
}

export default DataBase;
