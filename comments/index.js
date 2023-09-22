const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const cmt_id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: cmt_id, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: cmt_id,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body);
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
