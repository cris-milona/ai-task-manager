import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/parse-task", (req, res) => {
  const { input } = req.body;
  res.json({ message: "AI processing will go here", input });
});

app.listen(3001, () => console.log("Server running on port 3001"));
