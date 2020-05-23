const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParse.json());
app.use(cors());

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {});

app.listen(4002, () => {
  console.log("listening on 4002");
});
