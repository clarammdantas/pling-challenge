"use strict";
// We are creating this class to keep our database authentication
// info safe, so we don't accidently push this file to the github
// public repo with passwords and stuff.
Object.defineProperty(exports, "__esModule", { value: true });
class DataBaseAuth {
    constructor() {
        // Remember to delete those infos before push.
        this.password = 'admin';
        this.dbName = 'pling';
        this.url = `mongodb+srv://admin:${this.password}@cluster0.gx7n5.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
    }
}
exports.default = DataBaseAuth;
