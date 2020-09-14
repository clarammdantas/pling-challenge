import App from './app';
import DataBase from './database';


const db = new DataBase();
db.connect();

const app = new App();
app.start();


// import { app } from "./app";
// import "../db";
// import "./models/address";
//
// const PORT = process.env.PORT || 3000;
//
// app.listen(PORT, (err) => {
//     if (err) {
//         return console.log(err);
//     }
//
//     console.log("Listening on port: " + PORT);
// });
