import express from "express";
import dotenv from "dotenv";
import db from "./DB.js";

dotenv.config();
const app = express();
const PORT = 8888;

db();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
