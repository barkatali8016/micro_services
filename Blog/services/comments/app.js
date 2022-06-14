// comments - index.js

const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const axios = require("axios").default;
const cors = require("cors");

// parse request body in JSON

app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id,
        title,
        postId,
      },
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const body = req.body;
  console.log("Commennts Event received", body.type);
  res.json({ status: "OK", eventType: body.type });
});

app.listen(4001, () => {
  console.log("COMMENT SERVICE RUNNING @ localhost:4001 !");
});
