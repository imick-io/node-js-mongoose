const express = require("express");
const mongoose = require("mongoose");
const { mongoUri } = require("./config");

const app = express();

// Listen
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
