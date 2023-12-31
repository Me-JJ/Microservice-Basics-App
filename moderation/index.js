const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
      const status = data.content.includes("orange") ? "rejected" : "approved";

      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }

    res.send({});
  });
} catch (error) {
  console.log(error.message, "post from 4003 to 4005");
}

app.listen(4003, () => {
  console.log("Listening on 4003");
});
