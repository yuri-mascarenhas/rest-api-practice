import express from "express";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mocks
const mockComments = [
  {
    id: 1,
    username: "John",
    comment: "comment J.",
  },
  {
    id: 2,
    username: "Elizabeth",
    comment: "comment E.",
  },
  {
    id: 3,
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
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = mockComments.find((c) => c.id === parseInt(id));
  res.render("comments/show", { comment });
});

// Post methods
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  mockComments.push({ username, comment });
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000.");
});
