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

  comments.push({ id: cmt_id, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: cmt_id,
        content,
        postId: req.params.id,
        status: "pending",
      },
    });
  } catch (error) {
    console.log(error.message, " error post to 4005 from 4001");
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          status,
          postId,
          content,
        },
      });
    } catch (error) {
      console.log("post from 4001 to 4005/events");
    }
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
