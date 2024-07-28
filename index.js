import express from "express";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// GET methods
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/getpost.html"));
});

app.get("/bar", (req, res) => {
  res.send("Got in bar");
});

// POST methods
app.post("/bar", (req, res) => {
  console.log(req.body);
  res.send("Posted in bar");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000.");
});
