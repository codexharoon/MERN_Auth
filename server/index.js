import express from "express";
import dotenv from "dotenv";
import db from "./DB.js";
import authRoute from "./routes/auth.js";
const PORT = 8888;

const app = express();
app.use(express.json());
dotenv.config();

db();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
