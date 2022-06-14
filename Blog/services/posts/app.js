// posts -> app.js

const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const { send } = require("process");
const axios = require("axios").default;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
  return posts;
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const body = req.body;
  console.log("POST Event received", body.type);
  res.json({ status: "OK", eventType: body.type });
});

app.listen(4000, () => {
  console.log("POST SERVICE RUNNING  @ localhost:4000 !");
});
