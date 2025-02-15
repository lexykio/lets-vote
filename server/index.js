const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
require("dotenv").config(".env");
const mongoose = require("mongoose");
const Poll = require("./models/Poll");

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@letsvote.wd3wu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

//-----MIDDLEWARE---------
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// create a poll
app.post("/api/poll", (req, res) => {
  const pollData = req.body;
  const pollEntry = new Poll(pollData);
  pollEntry.save();
  res.send(pollEntry);
});

// get poll by id
app.get("/api/poll/:id", async (req, res) => {
  const id = req.params.id;
  const pollData = await Poll.findOne({ _id: id });
  console.log(pollData);
  res.send(pollData);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server now listening on http://localhost:${PORT}`);
});
