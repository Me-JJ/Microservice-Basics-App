const express = require("express");
const { randomBytes } = require("crypto");
// const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.get("/events", (req, res) => {
  res.send("LOL");
});
app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log("4000 post ERROR");
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log("4001 post ERROR");
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log("4002 post ERROR");
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on Port 4005");
});
