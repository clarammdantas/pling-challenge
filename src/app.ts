"use strict";

import express from "express";
import "../db.ts";

const app = express();
const port = process.env.PORT || 3000;

app.get("/get_names", (req, res, next) => {
    res.json(["Guinho", "Amelia"]);
});

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Listening on port: " + port);
});
