// QUERY SERVICE -> app.js

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
  if (JSON.stringify(posts) === JSON.stringify({})) {
    return res.json({
      success: 0,
      message: "No Posts Found.",
    });
  } else {
    return res.json({
      success: 1,
      posts,
      message: "Posts Found.",
    });
  }
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("QUERY Event received", type);
  if (type === "PostCreated") {
    posts[data.id] = { id: data.id, title: data.title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content } = data;
    const post = posts[data.postId];
    post.comments.push({ id, content });
  }
  console.log(posts, "post in query");
  res.json({ status: "OK", eventType: type });
});

app.listen(4002, () => {
  console.log("QUERY SERVICE RUNNING  @ localhost:4002 !");
});
