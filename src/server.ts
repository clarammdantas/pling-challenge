import App from './app';
import DataBase from './database';


const db = new DataBase();
db.connect();

const app = new App();
app.start();
