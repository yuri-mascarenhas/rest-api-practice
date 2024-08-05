import express from "express";
import { fileURLToPath } from "url";
import * as path from "path";
import { v4 as uuid } from "uuid";
import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mocks
const mockComments = [
  {
    id: uuid(),
    username: "John",
    comment: "comment J.",
  },
  {
    id: uuid(),
    username: "Elizabeth",
    comment: "comment E.",
  },
  {
    id: uuid(),
    username: "Dog",
    comment: "woof.",
  },
];

// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
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
  const comment = mockComments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = mockComments.find((c) => c.id === id);
  console.log(comment);
  res.render("comments/edit", { comment });
});

// Post methods
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  mockComments.push({ id: uuid(), username, comment });
  res.redirect("/comments");
});

// Patch methods
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const dbComment = mockComments.find((c) => c.id == id);
  dbComment.comment = newComment;
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000.");
});
