const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((com) => com.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.get("/posts", (req, res) => {
  // console.log(posts);
  res.send(posts);
});

app.listen(4002, async () => {
  console.log("listening on port 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");

  console.log("from event-bus/4005", res.data);

  for (let element of res.data) {
    console.log("Processing event: ", element.type);

    handleEvent(element.type, element.data);
  }
});
