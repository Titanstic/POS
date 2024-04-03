const express = require("express");
const app = express();
app.use(express.static("client/build"));

const path = require("path");
app.get("/index.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


app.get("/static/css/main.bb9a7732.css", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "static", "css", "main.bb9a7732.css"));
});


app.get("/static/js/main.891549f8.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "static", "js", "main.891549f8.js"));
});

app.get("/static/media/mula-logo.95b324c7509387a8b226.png", (re, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "static", "media", "mula-logo.95b324c7509387a8b226.png"));
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

module.exports = app;
