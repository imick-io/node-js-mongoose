const express = require("express");
const mongoose = require("mongoose");
const { mongoUri, port } = require("./config");

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const errorController = require("./controllers/error.controller");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  User.findOne().then((user) => {
    if (!user) {
      const newUser = new User({
        name: "John Doe",
        email: "john@doe.com",
      });

      newUser
        .save()
        .then((result) => {
          console.log("User created");
          req.user = result;
          next();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      req.user = user;
      next();
    }
  });
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use(errorController.get404);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.error(err);
  });
