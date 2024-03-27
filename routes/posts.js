const express = require("express");

const router = express.Router();

const postController = require("../controllers/post.controller");

router.get("/", postController.all);
router.get("/user", postController.allWithUser);
router.post("/", postController.create);

module.exports = router;
