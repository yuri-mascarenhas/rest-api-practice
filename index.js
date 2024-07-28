import express from "express";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mocks
const mockComments = [
  {
    username: "John",
    comment: "comment J.",
  },
  {
    username: "Elizabeth",
    comment: "comment E.",
  },
  {
    username: "Dog",
    comment: "woof.",
  },
];

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

app.get("/comments", (req, res) => {
  res.render("comments/index", { mockComments });
});

app.listen(3000, () => {
  console.log("Server started on Port 3000.");
});
