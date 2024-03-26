const User = require("../models/user");

exports.all = async (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.get = async (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.create = async (req, res, next) => {
  const { name, email } = req.body;
  const user = new User({
    name,
    email,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.update = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email } = req.body;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      user
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.delete = async (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).json({ message: "User deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
