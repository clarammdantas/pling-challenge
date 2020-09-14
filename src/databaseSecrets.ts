// We are creating this class to keep our database authentication
// info safe, so we don't accidently push this file to the github
// public repo with passwords and stuff.

// You should add your own password and dbName here.

class DataBaseAuth {
    password: string;
    dbName: string;
    url: string;

    constructor() {
        this.password = '';
        this.dbName = '';
        this.url = `mongodb+srv://admin:${this.password}@cluster0.gx7n5.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
    }
}

export default DataBaseAuth;
