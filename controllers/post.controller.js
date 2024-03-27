const Post = require("../models/post");

exports.all = async (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.allWithUser = async (req, res) => {
  Post.find()
    .populate("userId", "name")
    .select("-_id")
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const post = new Post({
    title,
    content,
    userId,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
