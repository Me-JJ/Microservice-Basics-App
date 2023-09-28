const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const events = [];

// app.get("/events", (req, res) => {
//   res.send("LOL");
// });
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);
  console.log("4005/events -> ", events);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log("4000 post ERROR");
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log("4001 post ERROR");
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log("4002/events post ERROR");
  });
  axios.post("http://moderations-srv:4003/events", event).catch((err) => {
    console.log("4003 post ERROR");
  });

  res.send({ status: "OK" });
});

try {
  app.get("/events", (req, res) => {
    console.log("---- from query ---");
    res.send(events);
  });
} catch (error) {
  console.log("get req to 4005/events");
}
app.listen(4005, () => {
  console.log("Listening on Port 4005");
});
