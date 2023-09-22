const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
