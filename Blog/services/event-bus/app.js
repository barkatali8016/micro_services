// event-bus  -> app.js

const express = require("express");
const app = express();
const axios = require("axios").default;

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  await axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.log(err));
  await axios
    .post("http://localhost:4001/events", event)
    .catch((err) => console.log(err));
  await axios
    .post("http://localhost:4002/events", event)
    .catch((err) => console.log(err));

  console.log("EVENT SEND FROM EVENT BUS");
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("EVENT BUS RUNNING ON localhost:4005 !");
});
