// ? Server Config

// * Import Statements
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// * Creating Express App
const app = express();

// * Middlewares
app.use(express.json());
app.use(cors());

// * PARSE application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * PARSE application/json
app.use(bodyParser.json());

// * Establishing Database Connection
mongoose
  .connect(process.env.DATABASE_URL, {
  })
  .then((db) => {
    console.log("Datebase Connection Established!");
  })
  .catch((err) => {
    console.log(err);
  });

// * Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/team", require("./routes/team"));
// Basic Route
app.get("/", (req, res) => {
  // Sending Response
  return res.send({
    server: "Heliverse",
    status: "Online",
    version: "1.0.0",
    host: req.headers.host,
  });
});

// * Defining Server Port
const PORT = process.env.PORT || 8000;

// * Creating Server
const server = http.createServer(app);

// * Listening to Server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// * Exporting Server
module.exports = server;