import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let random = 1000;
// update random value
setInterval(() => {
  const max = 10;
  const min = -10;

  random += Math.random() * (max - min) + min;
}, 100);

app.get("/api/random", function (req, res) {
  res.json(random);
});

let state: "on" | "off" = "off";
app.get("/api/state", function (req, res) {
  res.json(state);
});

app.put("/api/state", function (req, res) {
  console.log(req.body);
  const data = req.body.data;
  state = data === "on" ? "on" : "off";
  res.json(state);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
