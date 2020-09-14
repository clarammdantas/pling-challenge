"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// This provides us information to connect with a local db.
const databaseSecrets_1 = __importDefault(require("./databaseSecrets"));
class DataBase {
    constructor() {
        this.dbAuth = new databaseSecrets_1.default();
        this.url = process.env.MONGODB_URL || this.dbAuth.url;
    }
    connect() {
        mongoose_1.default.connect(this.url, { useNewUrlParser: true });
        mongoose_1.default.connection.on('connected', function () {
            console.log("Connection with the db established.");
        });
        mongoose_1.default.connection.on('error', function () {
            console.log("The connection with the db failed.");
        });
    }
}
exports.default = DataBase;
