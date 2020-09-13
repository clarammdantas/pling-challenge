"use strict";

import express from "express";

export const app = express();

app.get("/get_names", (req, res, next) => {
    res.json(["Guinho", "Amelia"]);
});
