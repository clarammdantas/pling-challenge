import { app } from "./app.ts";
import "../db.ts";
import "./models/address.ts";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Listening on port: " + PORT);
});
