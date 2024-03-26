const express = require("express");
const mongoose = require("mongoose");
const { mongoUri } = require("./config");

const userRoutes = require("./routes/users");
const errorController = require("./controllers/error.controller");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use(errorController.get404);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
